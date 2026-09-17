# Pokémon: Continente Unificado 🌍⚡

Fan-game no oficial que fusiona las tramas principales de las seis primeras
generaciones de Pokémon (Kanto, Johto, Hoenn, Sinnoh, Teselia y Kalos) en una
única aventura coherente, ambientada en el continente ficticio **Aeon**.

> ⚠️ Este es un proyecto de fan, sin ánimo de lucro. Pokémon y toda su
> propiedad intelectual pertenecen a Nintendo, Game Freak y The Pokémon
> Company. Ver [LICENSE](./LICENSE) para más detalles.

## 📖 Documento de diseño

El diseño narrativo y mecánico completo (arcos, gimnasios, Megaevolución,
mapa de conexiones, balance, etc.) está en:

👉 [`docs/game-design-document.md`](./docs/game-design-document.md)

## 🚧 Estado del proyecto

Este repositorio contiene actualmente el **motor base en Python**, no el
juego jugable completo (eso requeriría un motor gráfico como Godot/Unity,
sprites, mapas, cientos de datos de Pokémon, etc.). Lo que sí está
implementado y probado:

- ✅ Modelos de datos: `Pokemon`, `Move`, `Trainer`
- ✅ Tabla de tipos completa (18 tipos) y cálculo de efectividad
- ✅ Motor de combate por turnos con fórmula de daño estilo Pokémon (STAB,
  efectividad de tipo, velocidad, variación aleatoria)
- ✅ Soporte de Megaevolución (cambio de stats/tipos en combate)
- ✅ Grafo del mundo Aeon: regiones, conexiones y lógica de desbloqueo por
  progreso de arco
- ✅ Suite de tests con `pytest`
- ✅ Demo ejecutable por CLI

### Roadmap (no implementado todavía)

- [ ] Base de datos completa de los ~721 Pokémon (stats, movimientos, evoluciones)
- [ ] Motor gráfico / mapas navegables (recomendado: Godot 4 + GDScript, o Unity)
- [ ] Sistema de guardado/progreso de trama
- [ ] IA de combate más avanzada (más allá de "elegir el movimiento con más daño")
- [ ] Contenido de los 6 arcos narrativos como datos jugables (diálogos, eventos)
- [ ] Sistema de Concursos/Luchas de Espectáculo
- [ ] Postgame: Frontera de Batalla

## 🗂️ Estructura del repositorio

```
pokemon-continente-unificado/
├── docs/
│   └── game-design-document.md   # Diseño narrativo y mecánico completo
├── data/
│   ├── type_chart.json           # Tabla de efectividad de tipos
│   ├── regions.json              # Regiones de Aeon y sus conexiones
│   └── story_arcs.json           # Los 6 arcos narrativos y antagonistas
├── src/pokemon_aeon/
│   ├── models/                   # Pokemon, Move, Trainer
│   ├── battle/                   # Motor de combate
│   ├── world/                    # Grafo de regiones/mapa
│   └── main.py                   # Demo CLI
├── tests/
│   └── test_battle.py
├── pyproject.toml
├── requirements.txt
└── LICENSE
```

## ▶️ Cómo ejecutar

```bash
# 1. Clonar y entrar al repo
git clone https://github.com/TU_USUARIO/pokemon-continente-unificado.git
cd pokemon-continente-unificado

# 2. Crear entorno virtual e instalar dependencias
python -m venv .venv
source .venv/bin/activate      # En Windows: .venv\Scripts\activate
pip install -e ".[dev]"

# 3. Ejecutar la demo (mapa de Aeon + combate de ejemplo)
python -m pokemon_aeon.main

# 4. Ejecutar los tests
pytest -v
```

## 📤 Cómo subir este proyecto a GitHub

Si es la primera vez que lo subes:

```bash
cd pokemon-continente-unificado
git init
git add .
git commit -m "Commit inicial: GDD + motor base de combate y mundo"
git branch -M main

# Crea el repo vacío en GitHub primero (desde github.com/new), luego:
git remote add origin https://github.com/TU_USUARIO/pokemon-continente-unificado.git
git push -u origin main
```

## 🤝 Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para la guía de contribución.

## 📄 Licencia

Código bajo licencia MIT (ver [LICENSE](./LICENSE)). El contenido temático de
Pokémon es propiedad de sus respectivos dueños; este proyecto es un homenaje
de fans sin fines comerciales.
