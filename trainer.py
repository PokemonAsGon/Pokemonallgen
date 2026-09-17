"""Modelo de un entrenador: jugador, líder de gimnasio o rival."""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional

from .pokemon import Pokemon


@dataclass
class Trainer:
    name: str
    party: List[Pokemon] = field(default_factory=list)
    is_gym_leader: bool = False
    region: Optional[str] = None
    uses_mega: bool = False

    def first_available(self) -> Optional[Pokemon]:
        for p in self.party:
            if not p.is_fainted():
                return p
        return None

    def has_lost(self) -> bool:
        return all(p.is_fainted() for p in self.party)
