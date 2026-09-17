"""Grafo del continente Aeon: regiones y sus conexiones desbloqueables."""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional

DATA_DIR = Path(__file__).resolve().parents[3] / "data"


@dataclass
class Region:
    id: str
    name: str
    arc: int
    biome: str


@dataclass
class Connection:
    from_region: str
    to_region: str
    method: str
    unlock_condition: str


class AeonMap:
    """Modelo navegable del continente fusionado."""

    def __init__(self, regions: List[Region], connections: List[Connection]):
        self.regions: Dict[str, Region] = {r.id: r for r in regions}
        self.connections = connections

    @classmethod
    def load(cls) -> "AeonMap":
        with open(DATA_DIR / "regions.json", encoding="utf-8") as f:
            raw = json.load(f)
        regions = [Region(**r) for r in raw["regions"]]
        connections = [
            Connection(from_region=c["from"], to_region=c["to"], method=c["method"], unlock_condition=c["unlock_condition"])
            for c in raw["connections"]
        ]
        return cls(regions, connections)

    def neighbors(self, region_id: str) -> List[Connection]:
        return [c for c in self.connections if c.from_region == region_id or c.to_region == region_id]

    def region_for_arc(self, arc: int) -> Optional[Region]:
        for r in self.regions.values():
            if r.arc == arc:
                return r
        return None

    def unlocked_connections(self, current_arc: int) -> List[Connection]:
        """Devuelve las conexiones ya accesibles dado el arco de progreso actual.

        Regla simplificada: una conexión se desbloquea cuando el arco de destino
        es menor o igual al arco actual del jugador.
        """
        unlocked = []
        for c in self.connections:
            to_region = self.regions.get(c.to_region)
            if to_region and to_region.arc <= current_arc:
                unlocked.append(c)
        return unlocked

    def describe(self) -> str:
        lines = ["Mapa del continente Aeon:"]
        for r in sorted(self.regions.values(), key=lambda x: x.arc):
            lines.append(f"  Arco {r.arc}: {r.name} ({r.biome})")
        lines.append("Conexiones:")
        for c in self.connections:
            lines.append(f"  {c.from_region} -> {c.to_region} vía {c.method} [{c.unlock_condition}]")
        return "\n".join(lines)
