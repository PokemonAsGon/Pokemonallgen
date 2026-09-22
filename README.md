# Pokémon: Seis Regiones — prototipo 2D

Prototipo web hecho con HTML, CSS, JavaScript y Phaser 3.

## Contenido

- Kanto, Johto, Hoenn, Sinnoh, Unova y Kalos.
- 48 gimnasios.
- Alto Mando + Campeón después de las 48 medallas.
- Sistema de combate por turnos.
- Megaevolución limitada por combate.
- Desbloqueo y captura de un legendario tras superar el Alto Mando.
- Guardado local con `localStorage`.
- Mapas 2D generados por código, sin necesidad de descargar un tileset.

## Ejecutarlo en local

Abre `index.html` en un navegador moderno. Para evitar restricciones de algunos navegadores, también puedes usar un servidor local:

```bash
python -m http.server 8000
```

Después entra en `http://localhost:8000`.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Primer prototipo Pokémon Seis Regiones"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

## Publicarlo en Render

1. Crea una cuenta en Render.
2. Pulsa **New > Static Site**.
3. Conecta el repositorio de GitHub.
4. Build Command: déjalo vacío.
5. Publish Directory: `.`
6. Crea el servicio.

También puedes usar el `render.yaml` incluido mediante un Blueprint.

## Próximas mejoras recomendadas

- Cambiar los círculos de combate por sprites propios/licenciados.
- Añadir mapas con colisiones y NPCs.
- Añadir 6 equipos completos y cambios de Pokémon.
- Añadir tipos, ventajas/desventajas, estados y movimientos.
- Añadir inventario, Pokédex, objetos y tiendas.
- Añadir animaciones de ataques y Megaevolución.
- Crear una historia que conecte las seis regiones.
- Añadir una pantalla de selección de región y viajes entre ciudades.

## Nota sobre propiedad intelectual

Los personajes, nombres, criaturas, música, sprites y otros elementos de Pokémon pertenecen a sus respectivos titulares. Este prototipo usa nombres de la franquicia como demostración y genera gráficos simples por código. Para publicar una versión distribuida, usa recursos que tengas derecho a utilizar y revisa las condiciones de la plataforma y de los titulares.
