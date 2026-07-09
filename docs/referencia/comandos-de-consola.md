# Comandos de consola

Todos los comandos de administración de Puppeteer cuelgan de `/puppeteer`, con autocompletado al pulsar Tab (subcomandos, nombres de scripts, etc.). Requieren el permiso `puppeteer.admin` (por defecto, solo op).

## `/puppeteer`

Sin nada más, muestra la versión instalada y un recordatorio rápido de los subcomandos.

## `/puppeteer reload`

Vuelve a leer todos los archivos de la carpeta `scripts/` (y también las rutas de `paths/`). Úsalo cada vez que edites o añadas un script, para que se aplique sin reiniciar el servidor.

Si algún archivo tiene un error de sintaxis, Puppeteer te lo dice específicamente (qué archivo y por qué) y **sigue cargando el resto con normalidad** — un archivo roto no tira abajo los demás.

## `/puppeteer assign <script>`

Asigna un script de tipo `assignment` al NPC que tengas seleccionado (con el bastón de selección de Citizens, o tras un `/npc select`). El nombre del script se autocompleta.

Si el NPC no tenía ningún comportamiento de Puppeteer todavía, se lo añade automáticamente — no hace falta ningún paso previo.

## `/puppeteer unassign`

Le quita a el NPC seleccionado cualquier script que tuviera asignado: deja de moverse, de pelear y de reaccionar a eventos.

## `/puppeteer path create <nombre> [bucle] [velocidad]`

Empieza a grabar una nueva ruta de patrulla en tu posición actual. `bucle` es `true`/`false` (por defecto `false`) y `velocidad` un número (por defecto `1.0`). Ver [Rutas de patrulla](/guia/rutas) para el flujo completo.

## `/puppeteer path node`

Añade tu posición actual como el siguiente punto de la ruta que estés grabando.

## `/puppeteer path save`

Guarda la ruta que estabas grabando. Hace falta al menos un punto además del de inicio.

## `/puppeteer path cancel`

Descarta la ruta que estabas grabando, sin guardar nada.
