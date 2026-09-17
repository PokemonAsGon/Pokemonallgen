# Guía de contribución

¡Gracias por tu interés en aportar a **Pokémon: Continente Unificado**!

## Antes de empezar

1. Revisa el [documento de diseño](./docs/game-design-document.md) para
   entender el tono y la estructura narrativa del proyecto.
2. Abre un *issue* describiendo lo que quieres trabajar antes de mandar un
   PR grande, para evitar duplicar esfuerzo.

## Flujo de trabajo

```bash
# 1. Haz un fork y clónalo
git clone https://github.com/TU_USUARIO/pokemon-continente-unificado.git
cd pokemon-continente-unificado

# 2. Crea una rama descriptiva
git checkout -b feature/nombre-de-tu-cambio

# 3. Instala en modo desarrollo
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"

# 4. Haz tus cambios y corre los tests antes de commitear
pytest -v

# 5. Commitea con un mensaje claro y en imperativo
git commit -m "Añade cálculo de efectividad para movimientos de estado"

# 6. Push y abre un Pull Request
git push origin feature/nombre-de-tu-cambio
```

## Estándares de código

- Python ≥ 3.10, tipado con type hints donde sea razonable.
- Todo módulo nuevo en `src/pokemon_aeon/` debe tener sus tests
  correspondientes en `tests/`.
- Los datos de juego (Pokémon, movimientos, regiones) van en `data/` como
  JSON, no hardcodeados en el código, para mantenerlo escalable.
- Mantén el `game-design-document.md` como fuente de verdad narrativa: si tu
  cambio de código implica una decisión de diseño nueva, documéntala ahí
  también.

## Áreas donde más se necesita ayuda (ver Roadmap en el README)

- Base de datos de Pokémon (stats/movimientos/evoluciones) en `data/`.
- Prototipo de motor gráfico (Godot recomendado por su licencia MIT y
  soporte 2D).
- Contenido narrativo de los arcos (diálogos, eventos de trama).
