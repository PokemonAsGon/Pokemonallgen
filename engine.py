"""Motor de combate por turnos, con cálculo de daño estilo Pokémon."""
from __future__ import annotations

import json
import random
from pathlib import Path
from typing import List

from ..models.move import Move
from ..models.pokemon import Pokemon
from ..models.trainer import Trainer

DATA_DIR = Path(__file__).resolve().parents[3] / "data"


def load_type_chart() -> dict:
    with open(DATA_DIR / "type_chart.json", encoding="utf-8") as f:
        raw = json.load(f)
    raw.pop("_comment", None)
    return raw


TYPE_CHART = load_type_chart()


def type_effectiveness(move_type: str, defender_types: List[str]) -> float:
    """Multiplicador de efectividad de un tipo de movimiento contra 1-2 tipos defensores."""
    chart = TYPE_CHART.get(move_type, {})
    multiplier = 1.0
    for def_type in defender_types:
        multiplier *= chart.get(def_type, 1.0)
    return multiplier


def calculate_damage(attacker: Pokemon, defender: Pokemon, move: Move, rng: random.Random = random) -> int:
    """Fórmula de daño simplificada (basada en la fórmula estándar de los juegos)."""
    if move.category == "status" or move.power <= 0:
        return 0

    level = attacker.level
    if move.category == "physical":
        atk_stat = attacker.stat("attack")
        def_stat = defender.stat("defense")
    else:
        atk_stat = attacker.stat("sp_attack")
        def_stat = defender.stat("sp_defense")

    stab = 1.5 if move.type_ in attacker.active_types else 1.0
    effectiveness = type_effectiveness(move.type_, defender.active_types)
    if effectiveness == 0:
        return 0

    variance = rng.uniform(0.85, 1.0)

    base = (((2 * level / 5 + 2) * move.power * (atk_stat / max(def_stat, 1))) / 50) + 2
    damage = base * stab * effectiveness * variance
    return max(1, int(damage))


def choose_best_move(attacker: Pokemon, defender: Pokemon) -> Move:
    """IA simple: elige el movimiento con mayor daño esperado."""
    usable = [m for m in attacker.moves if m.category != "status"]
    if not usable:
        raise ValueError(f"{attacker.name} no tiene movimientos ofensivos.")
    return max(usable, key=lambda m: calculate_damage(attacker, defender, m, rng=random.Random(0)))


class BattleResult:
    def __init__(self, winner: Trainer, turns: int, log: List[str]):
        self.winner = winner
        self.turns = turns
        self.log = log


def run_battle(trainer_a: Trainer, trainer_b: Trainer, max_turns: int = 100, seed: int | None = None) -> BattleResult:
    """Simula un combate 1v1 (rotando Pokémon debilitados) entre dos entrenadores."""
    rng = random.Random(seed)
    log: List[str] = []

    for turn in range(1, max_turns + 1):
        pa = trainer_a.first_available()
        pb = trainer_b.first_available()

        if pa is None:
            return BattleResult(trainer_b, turn, log)
        if pb is None:
            return BattleResult(trainer_a, turn, log)

        move_a = choose_best_move(pa, pb)
        move_b = choose_best_move(pb, pa)

        first, first_move, second, second_move, second_trainer_first = (
            (pa, move_a, pb, move_b, trainer_a)
            if pa.stat("speed") >= pb.stat("speed")
            else (pb, move_b, pa, move_a, trainer_b)
        )

        dmg1 = calculate_damage(first, second, first_move, rng)
        second.take_damage(dmg1)
        log.append(f"Turno {turn}: {first.name} usa {first_move.name} -> {dmg1} de daño a {second.name}")

        if not second.is_fainted():
            dmg2 = calculate_damage(second, first, second_move, rng)
            first.take_damage(dmg2)
            log.append(f"Turno {turn}: {second.name} usa {second_move.name} -> {dmg2} de daño a {first.name}")
        else:
            log.append(f"Turno {turn}: {second.name} se debilitó.")

    # Empate por límite de turnos: gana quien tenga más HP total restante
    hp_a = sum(p.current_hp for p in trainer_a.party)
    hp_b = sum(p.current_hp for p in trainer_b.party)
    winner = trainer_a if hp_a >= hp_b else trainer_b
    return BattleResult(winner, max_turns, log)
