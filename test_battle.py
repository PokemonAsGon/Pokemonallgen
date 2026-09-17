import random

import pytest

from pokemon_aeon.battle.engine import calculate_damage, run_battle, type_effectiveness
from pokemon_aeon.models.move import Move
from pokemon_aeon.models.pokemon import Pokemon
from pokemon_aeon.models.trainer import Trainer


def make_pokemon(name, types, moves=None, level=50):
    return Pokemon(
        name=name,
        types=types,
        base_stats={"hp": 80, "attack": 80, "defense": 80, "sp_attack": 80, "sp_defense": 80, "speed": 80},
        level=level,
        moves=moves or [],
    )


def test_type_effectiveness_super_effective():
    assert type_effectiveness("water", ["fire"]) == 2.0


def test_type_effectiveness_immune():
    assert type_effectiveness("normal", ["ghost"]) == 0.0


def test_type_effectiveness_double_resist():
    # Fuego contra Agua/Roca: 0.5 * 0.5
    assert type_effectiveness("fire", ["water", "rock"]) == 0.25


def test_damage_is_positive_for_effective_move():
    attacker = make_pokemon("Attacker", ["water"])
    defender = make_pokemon("Defender", ["fire"])
    move = Move("Hidrobomba", "water", 90, category="special")
    dmg = calculate_damage(attacker, defender, move, rng=random.Random(1))
    assert dmg > 0


def test_damage_is_zero_for_immune_target():
    attacker = make_pokemon("Attacker", ["normal"])
    defender = make_pokemon("Defender", ["ghost"])
    move = Move("Placaje", "normal", 40, category="physical")
    dmg = calculate_damage(attacker, defender, move, rng=random.Random(1))
    assert dmg == 0


def test_status_move_deals_no_damage():
    attacker = make_pokemon("Attacker", ["psychic"])
    defender = make_pokemon("Defender", ["normal"])
    move = Move("Pantalla de Luz", "psychic", 0, category="status")
    dmg = calculate_damage(attacker, defender, move, rng=random.Random(1))
    assert dmg == 0


def test_mega_evolution_changes_active_stats():
    pikachu = make_pokemon("Charizard", ["fire", "flying"])
    pikachu.mega_stone = "Charizardita X"
    pikachu.mega_types = ["fire", "dragon"]
    pikachu.mega_base_stats = {**pikachu.base_stats, "attack": 130}

    assert pikachu.can_mega_evolve()
    pikachu.mega_evolve()
    assert pikachu.is_mega
    assert pikachu.active_types == ["fire", "dragon"]
    assert pikachu.active_stats["attack"] == 130


def test_run_battle_produces_a_winner():
    strong_move = Move("Ataque", "normal", 90, category="physical")
    p1 = make_pokemon("Uno", ["normal"], moves=[strong_move])
    p2 = make_pokemon("Dos", ["normal"], moves=[strong_move], level=5)

    t1 = Trainer(name="Entrenador A", party=[p1])
    t2 = Trainer(name="Entrenador B", party=[p2])

    result = run_battle(t1, t2, seed=7)
    assert result.winner in (t1, t2)
    assert result.turns > 0
    assert len(result.log) > 0
