"""Modelo de un Pokémon en combate."""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional

from .move import Move

STAT_KEYS = ("hp", "attack", "defense", "sp_attack", "sp_defense", "speed")


@dataclass
class Pokemon:
    """Un Pokémon individual con sus estadísticas base, tipo(s) y movimientos."""

    name: str
    types: List[str]
    base_stats: dict  # claves: STAT_KEYS
    level: int = 5
    moves: List[Move] = field(default_factory=list)
    mega_stone: Optional[str] = None
    is_mega: bool = False
    mega_types: Optional[List[str]] = None  # tipos al megaevolucionar, si difieren
    mega_base_stats: Optional[dict] = None

    _current_hp: Optional[int] = field(default=None, repr=False)

    def __post_init__(self) -> None:
        missing = [k for k in STAT_KEYS if k not in self.base_stats]
        if missing:
            raise ValueError(f"Faltan estadísticas base: {missing}")
        if self._current_hp is None:
            self._current_hp = self.max_hp

    @property
    def active_stats(self) -> dict:
        """Estadísticas base activas, considerando si está megaevolucionado."""
        if self.is_mega and self.mega_base_stats:
            return self.mega_base_stats
        return self.base_stats

    @property
    def active_types(self) -> List[str]:
        if self.is_mega and self.mega_types:
            return self.mega_types
        return self.types

    @property
    def max_hp(self) -> int:
        base = self.base_stats["hp"]
        return int(((2 * base * self.level) / 100) + self.level + 10)

    @property
    def current_hp(self) -> int:
        return self._current_hp if self._current_hp is not None else self.max_hp

    def stat(self, name: str) -> int:
        """Calcula una estadística (no-HP) al nivel actual, fórmula simplificada."""
        if name == "hp":
            return self.max_hp
        base = self.active_stats[name]
        return int(((2 * base * self.level) / 100) + 5)

    def is_fainted(self) -> bool:
        return self.current_hp <= 0

    def take_damage(self, amount: int) -> None:
        self._current_hp = max(0, self.current_hp - amount)

    def heal(self, amount: Optional[int] = None) -> None:
        target = self.max_hp if amount is None else min(self.max_hp, self.current_hp + amount)
        self._current_hp = target

    def can_mega_evolve(self) -> bool:
        return self.mega_stone is not None and not self.is_mega and not self.is_fainted()

    def mega_evolve(self) -> None:
        if not self.can_mega_evolve():
            raise ValueError(f"{self.name} no puede megaevolucionar en este estado.")
        self.is_mega = True

    def revert_mega(self) -> None:
        self.is_mega = False
