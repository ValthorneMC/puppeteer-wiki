# Preguntas frecuentes

### ¿Necesito Sentinel además de Puppeteer?

No — Puppeteer reemplaza a Sentinel por completo. Todo lo que hacía Sentinel con comandos se hace aquí escribiendo la sección `combat:` en un script. Puedes desinstalar Sentinel una vez migres tus NPCs.

### ¿Puedo usar el mismo script en varios NPCs?

Sí. Asigna el mismo nombre de script a tantos NPCs como quieras con `/puppeteer assign <nombre>` — cada NPC lleva su propio estado (vida, objetivo actual, etc.) por separado, aunque compartan el mismo comportamiento escrito.

### ¿Puedo editar a mano el archivo de una ruta guardada?

Sí, los archivos de `paths/` son texto plano y se pueden editar igual que los scripts — solo hay que respetar el formato (`loop`, `speed`, y una lista de `nodes` con `world`/`x`/`y`/`z`). Lo más práctico sigue siendo crearlas in-game con `/puppeteer path`, pero ajustar un punto suelto a mano es perfectamente válido.

### ¿Cuántos NPCs de combate puedo tener a la vez?

No hay un límite fijado por Puppeteer — cada NPC de combate se procesa por separado, de forma ligera, varias veces por segundo. El límite real lo pone el rendimiento general de tu servidor, igual que con cualquier otro NPC.

### ¿Puedo hacer que un NPC dispare otra cosa que no sea una flecha?

Sí — `projectile:` acepta cualquier tipo de proyectil de Minecraft (`SNOWBALL`, `TRIDENT`, `SPECTRAL_ARROW`...), no solo flechas. Ver [Combate](/referencia/combate).

### ¿Qué pasa si dos scripts usan el mismo nombre?

Gana el último que se cargue — evita nombres repetidos entre tus archivos para no llevarte sorpresas. Puppeteer no avisa de duplicados por ahora.
