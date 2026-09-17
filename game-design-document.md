# POKÉMON: CONTINENTE UNIFICADO
### Documento de Diseño (Game Design Document)

---

## 1. Premisa y título de trabajo

**Título provisional:** *Pokémon: Eclipse Eterno* (referencia al tema central: el ciclo natural que la entidad oculta busca romper).

El jugador nace en **Villa Origen**, un pueblo inspirado visualmente en Pueblo Paleta pero situado en el punto geográfico donde confluyen las seis regiones fusionadas en un único supercontinente: **Aeon**. Aeon no es un colage aleatorio de mapas, sino una masa continental con lógica geológica propia: Kanto y Johto forman el núcleo templado central: Hoenn se extiende como un archipiélago tropical al sur; Sinnoh ocupa el macizo montañoso y nevado del norte; Teselia forma la franja industrial y urbana al oeste; y Kalos cierra el continente por el este, como la región más "moderna" y cercana al mar.

La premisa de fondo: hace siglos, un pacto entre los Pokémon legendarios mantuvo en equilibrio cuatro fuerzas —naturaleza, tiempo, espacio y el ciclo vida/muerte—. Una organización oculta, la **Orden del Vacío**, ha pasado generaciones infiltrando y manipulando a los cinco equipos criminales conocidos, usando a cada uno como "llave" para debilitar una de esas fuerzas sin que ellos mismos lo sepan.

---

## 2. Geografía: cómo se fusiona el continente

Para que la fusión se sienta coherente y no como seis mapas pegados, se establecen **cinco tipos de conexión** entre regiones, cada uno con su propia identidad jugable:

| Conexión | Regiones que une | Método | Momento de desbloqueo |
|---|---|---|---|
| Ruta 1 (histórica) | Kanto ↔ Johto | Rutas terrestres clásicas (como en Oro/Plata) | Desde el inicio |
| Estrecho Índigo | Johto ↔ Hoenn | Ferri desde Ciudad Trigal / Puerto Índigo | Tras 4º gimnasio del Arco 1 |
| Cordillera Coronada | Hoenn ↔ Sinnoh | Túnel de montaña + HM Escalar | Al iniciar Arco 3 |
| Línea Maglev Unova | Sinnoh ↔ Teselia | Tren de alta velocidad (icónico de Teselia) | Al iniciar Arco 4 |
| Eurotúnel Kalos | Teselia ↔ Kalos | Túnel submarino de alta tecnología | Al iniciar Arco 5 |

Una vez desbloqueadas todas las conexiones (hacia el final del Arco 5), se habilita el **Pase Aeon**, un objeto que permite viajar instantáneamente entre las seis terminales principales (equivalente narrativo al "viajar en avión"), evitando el backtracking tedioso en el postgame y en la Liga Unificada.

---

## 3. Estructura narrativa por arcos

### Arco 0 — Prólogo (Villa Origen)
Tutorial clásico: elección de starter (se ofrecen los 6 iniciales de Kanto/Johto/Hoenn como opción ampliada, con los demás desbloqueables más adelante vía trama). Primer contacto con un fragmento de meteorito corrupto que servirá de hilo conductor visual de "algo va mal" desde el minuto uno.

### Arco 1 — Kanto/Johto: Los cimientos
- **Antagonista:** Team Rocket.
- **Tema:** ambición, codicia, control de Pokémon mediante la fuerza.
- **Función narrativa:** establece las reglas del mundo (gimnasios, Liga, rivalidad con el personaje rival). Rocket busca fragmentos de un artefacto antiguo sin saber para quién trabaja realmente (un intermediario de la Orden del Vacío se hace pasar por "asesor científico").
- **Cierre de arco:** derrota del Alto Mando Kanto-Johto; el Campeón (equivalente a un Red/Lance fusionado narrativamente) se convierte en mentor itinerante.

### Arco 2 — Hoenn: Clima y territorio
- **Antagonistas:** Team Magma y Team Aqua (activos simultáneamente, en tensión mutua).
- **Tema:** el equilibrio entre tierra y mar, ecosistemas y consecuencias del extremismo ambiental.
- **Giro:** el jugador descubre documentos que vinculan la financiación de ambos equipos a una misma fuente anónima, primera pista explícita de la Orden.
- **Cierre de arco:** Groudon/Kyogre son detenidos de despertar catastróficamente; el Campeón de Hoenn se une como aliado recurrente.

### Arco 3 — Sinnoh: Creación del universo
- **Antagonista:** Team Galaxia.
- **Tema:** los orígenes del tiempo, el espacio y la antimateria; la ambición de "recrear el universo" bajo un nuevo orden.
- **Giro central:** se revela que el líder visible de Galaxia era solo un peón emocionalmente manipulado por la Orden, que usó su trauma personal como arma.
- **Cierre de arco:** enfrentamiento en el mundo distorsionado de Giratina; el Campeón de Sinnoh (perfil analítico, tipo "Cynthia") se convierte en aliada permanente que acompañará al jugador en el Arco 4.

### Arco 4 — Teselia: Verdad e ideales
- **Antagonista:** Team Plasma.
- **Tema:** ética de la relación humano-Pokémon; el debate genuino sobre la liberación es presentado sin caricaturizar ninguna postura.
- **Giro:** el jugador descubre que la retórica de "liberación" de Plasma fue diseñada por la Orden específicamente para debilitar los vínculos entrenador-Pokémon, un componente necesario para su ritual final.
- **Cierre de arco:** la Campeona de Sinnoh presenta al jugador a la red de excampeones que ya sospechan de la Orden. Se forma oficialmente la **Alianza de Campeones**.

### Arco 5 — Kalos: Vida eterna y destrucción
- **Antagonista:** Team Flare.
- **Tema:** el deseo de "belleza eterna" y purificación mediante destrucción selectiva; clímax tecnológico y estético del juego.
- **Mecánica clave:** introducción formal de la **Megaevolución** (ver sección 5).
- **Giro final del arco:** el líder de Flare es derrotado, pero en sus archivos aparece por primera vez el símbolo real de la Orden del Vacío, hasta ahora solo insinuado.

### Arco 6 — Arco final: La Orden del Vacío
- Revelación completa: la Orden no busca destruir el mundo, sino "reiniciarlo" a un estado anterior al pacto legendario, eliminando el libre albedrío de los Pokémon.
- El jugador recorre un **Séptimo territorio oculto** (una región no cartografiada, construida con estética que mezcla elementos de las seis anteriores) acompañado por los Campeones y Altos Mandos aliados de cada región, cada uno enfrentando a un "eco corrupto" de su propio arco (una versión oscura de Team Rocket, Magma/Aqua, Galaxia, Plasma y Flare, fusionados).
- Combate final de trama contra el líder de la Orden, seguido por la **Liga Unificada** como desafío jugable definitivo.

---

## 4. Gimnasios y Alto Mando: la "ruta narrativa"

Con 48 gimnasios totales el ritmo sería insostenible, así que se ofrece una elección real al jugador:

- **Modo Explorador (completo):** los 48 gimnasios, para quienes quieran la experiencia íntegra región por región.
- **Modo Camino Aeon (recomendado/narrativo, 16-20 gimnasios):** al llegar a cada región, el jugador elige entre 2-3 gimnasios "representativos" de esa región (normalmente ligados a la trama principal del arco), y los gimnasios no elegidos aparecen como **contenido opcional post-arco**, sin penalización narrativa. Por ejemplo, en Hoenn el jugador podría elegir entre el gimnasio Roca de Petilil o el gimnasio Lucha de Fortree como parte de la ruta principal, dejando el otro disponible para más tarde.
- Cada Alto Mando regional se combate **inmediatamente al cerrar su arco**, no al final del juego, manteniendo el ritmo clásico de "clímax regional". El Campeón resultante pasa a integrarse en la trama de la región siguiente como aliado, mentor puntual, o incluso rival ocasional (ej. Cynthia reaparece en Teselia ayudando a investigar Plasma; Diantha aparece activamente en el Arco 6).
- **Liga Unificada (postgame/climax final):** torneo de exhibición y desafío definitivo donde el jugador se enfrenta, en orden ascendente de dificultad, a los seis Campeones regionales usando equipos actualizados con Megaevolución y niveles equivalentes al Alto Mando más fuerte del juego.

---

## 5. Megaevolución como mecánica global

- Se introduce **narrativamente** en el Arco 5 (Kalos), coherente con su origen en la saga original.
- Al completar el arco, el jugador obtiene el **Mega Aro**, que retroactivamente desbloquea la posibilidad de megaevolucionar cualquier Pokémon compatible capturado en regiones anteriores (Charizard, Blastoise, Venusaur, Blaziken, Garchomp, etc., si el jugador los ha mantenido en su equipo).
- Las Mega Piedras se reparten de dos formas:
  - Como **recompensa por vencer gimnasios específicos** (cada gimnasio "regala" la piedra correspondiente a su tipo cuando aplica).
  - Como **objetos de evento ligados a la trama**, encontrados en ruinas o entregados por personajes clave tras resolver subtramas opcionales.
- Los líderes de gimnasio de Kalos y **algunos rivales recurrentes de arcos anteriores** (reintroducidos con equipos actualizados en el Arco 6) usan Megaevolución como mecánica de dificultad avanzada, evitando que sea exclusiva de un único arco.

---

## 6. Progresión y balance

- **Escalado dinámico de nivel:** los Pokémon salvajes y entrenadores de Kanto/Johto se recalculan según el nivel de progresión del jugador en la ruta narrativa (similar a un sistema de "level scaling" con techo por zona), de forma que revisitar Kanto en el postgame no se sienta trivial.
- **Pokédex unificada:** los ~721 Pokémon disponibles hasta Kalos, distribuidos de forma lógica por bioma y región, con migraciones estacionales o eventos especiales para especies exclusivas de una sola región.
- **Viaje rápido:** una vez desbloqueadas las conexiones (sección 2), se habilitan HMs clásicas (Surf, Vuelo) además del sistema Maglev y los ferris como alternativas narrativas al viaje instantáneo, hasta obtener el Pase Aeon.

---

## 7. Contenido opcional

- **Safari/Área Segura:** versión distinta por región (Safari clásico en Kanto, Gran Área Marina en Hoenn, Área Segura nevada en Sinnoh, etc.), cada una con tablas de especies propias.
- **Concursos Pokémon** (Hoenn/Sinnoh) y **Luchas de Espectáculo** (Kalos) como actividades secundarias con recompensas cosméticas y algunos objetos exclusivos de evolución.
- **Postgame:** Torre/Frontera de Batalla combinada, con instalaciones inspiradas en distintas generaciones (Torre de Batalla clásica, Fábrica, Palacio, Pirámide), desbloqueadas progresivamente tras la Liga Unificada.

---

## 8. Tono y dirección artística

Aventura clásica de crecimiento personal, con una capa de misterio que se acumula gradualmente: cada arco regional se siente autocontenido y nostálgico en su ambientación y música (temas orquestales reinterpretados de cada juego original), pero deja pistas visuales sutiles (símbolos, informes filtrados, testigos) que solo cobran sentido completo en el Arco 6. El diseño evita que la Orden del Vacío se sienta como un "añadido forzado": cada equipo criminal conserva su motivación y personalidad original; la Orden es una sombra que se revela retroactivamente, no un reemplazo de sus historias.

---

## 9. Resumen de ritmo de juego (aprox.)

| Arco | Región | Gimnasios (ruta narrativa) | Horas estimadas |
|---|---|---|---|
| 0 | Villa Origen | — | 1-2h |
| 1 | Kanto/Johto | 4-5 | 12-15h |
| 2 | Hoenn | 3 | 8-10h |
| 3 | Sinnoh | 3 | 8-10h |
| 4 | Teselia | 3 | 8-10h |
| 5 | Kalos | 3-4 | 8-10h |
| 6 | Final/Séptimo territorio | — | 5-7h |
| Postgame | Liga Unificada + Frontera | — | 10h+ |

**Total ruta narrativa:** ~55-65 horas. **Modo Explorador completo:** 90h+.
