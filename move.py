"""Modelo de un movimiento Pokémon."""
from dataclasses import dataclass


@dataclass
class Move:
    """Representa un movimiento que un Pokémon puede usar en combate."""

    name: str
    type_: str
    power: int
    accuracy: int = 100
    category: str = "physical"  # "physical" | "special" | "status"

    def __post_init__(self) -> None:
        if self.category not in ("physical", "special", "status"):
            raise ValueError(f"Categoría de movimiento inválida: {self.category}")
        if not (0 <= self.accuracy <= 100):
            raise ValueError("La precisión debe estar entre 0 y 100")
