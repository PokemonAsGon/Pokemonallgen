"""Demo CLI: muestra el mapa de Aeon y simula un combate de ejemplo."""
from __future__ import annotations

from .battle.engine import run_battle
from .models.move import Move
from .models.pokemon import Pokemon
from .models.trainer import Trainer
from .world.map_graph import AeonMap


def build_demo_trainers() -> tuple[Trainer, Trainer]:
    charizard = Pokemon(
        name="Charizard",
        types=["fire", "flying"],
        base_stats={"hp": 78, "attack": 84, "defense": 78, "sp_attack": 109, "sp_defense": 85, "speed": 100},
        level=50,
        moves=[
            Move("Lanzallamas", "fire", 90, category="special"),
            Move("Ala de Acero", "steel", 70, category="physical"),
        ],
        mega_stone="Charizardita Y",
    )
    blastoise = Pokemon(
        name="Blastoise",
        types=["water"],
        base_stats={"hp": 79, "attack": 83, "defense": 100, "sp_attack": 85, "sp_defense": 105, "speed": 78},
        level=50,
        moves=[
            Move("Hidrobomba", "water", 110, category="special"),
            Move("Cabezazo", "normal", 70, category="physical"),
        ],
    )

    player = Trainer(name="Jugador", party=[charizard])
    rival = Trainer(name="Rival (Líder Hoenn)", party=[blastoise], is_gym_leader=True, region="hoenn")
    return player, rival


def main() -> None:
    print("=" * 60)
    aeon = AeonMap.load()
    print(aeon.describe())
    print("=" * 60)

    player, rival = build_demo_trainers()
    result = run_battle(player, rival, seed=42)

    print("\nCombate de demostración: Jugador vs. Líder de Hoenn\n")
    for line in result.log:
        print(line)

    print(f"\nGanador: {result.winner.name} (en {result.turns} turnos)")


if __name__ == "__main__":
    main()
