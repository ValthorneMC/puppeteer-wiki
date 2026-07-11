# Solución de problemas

## Mi NPC no recibe daño / es invencible

Comprueba que su `assignment` tiene una sección `combat:` — es lo que hace que un NPC pueda recibir daño y morir. Sin esa sección, el NPC se comporta como cualquier NPC normal de Citizens (invulnerable por defecto).

## Mi NPC no ataca a un mob de MythicMobs / a un tipo concreto de jugador

- Revisa que el nombre en `"mythicmob:<nombre>"` es el nombre interno exacto del mob en su configuración de MythicMobs (mayúsculas/minúsculas no importan, pero el nombre sí tiene que coincidir).
- Comprueba en la consola, al arrancar el servidor, la línea `Puppeteer enabled. Hooks: ...`. Si dice `mythic=MythicMobs (not detected yet)`, significa que en ese momento Puppeteer no detectó MythicMobs activo — en cuanto MythicMobs termine de cargar debería funcionar solo, sin reiniciar nada.
- Si el NPC ya tenía otro objetivo fijado (por ejemplo, llevaba un rato persiguiendo a un jugador), primero tiene que soltarlo — eso pasa solo en cuanto ese objetivo deje de cumplir `combat.targets` o salga de rango, no hace falta hacer nada manualmente.

## Mi NPC con arco se queda quieto o no dispara

Asegúrate de que el arma tiene `projectile:` en su configuración (por ejemplo `projectile: ARROW`) — sin eso, Puppeteer trata el arma como cuerpo a cuerpo, y un arma cuerpo a cuerpo con rango largo hace que el NPC no se acerque lo suficiente para golpear. Ver [Combate](/referencia/combate).

También comprueba que tenga línea de visión al objetivo — sin visión directa, el NPC no dispara, se acerca en su lugar (igual que le pasaría a un jugador real intentando disparar a través de una pared).

## Mi NPC no reaparece tras morir

Revisa el valor de `combat.respawn`. Si está en `0`, el NPC se queda despawneado hasta que lo reasignes o lo hagas reaparecer a mano; si es negativo, se destruye permanentemente al morir. El valor por defecto (`100`, cinco segundos) hace que reaparezca solo en el sitio donde murió.

## Al recargar (`/puppeteer reload`) parece que faltan scripts

Mira el chat/consola justo después de recargar: si algún archivo tiene un error de sintaxis YAML, Puppeteer te dice cuál y por qué, y **carga el resto con normalidad** — el archivo con el error es el único que no se aplica hasta que lo corrijas. Los errores más comunes son indentación incorrecta (mezclar espacios) o dos puntos que faltan.

## Cambié un script pero el NPC sigue comportándose como antes

Confirma que has ejecutado `/puppeteer reload` después de guardar el archivo, y que el NPC tiene asignado el script que crees (compruébalo con `/puppeteer assign <nombre>` de nuevo si tienes dudas — no hace daño repetirlo).

## `look`/`walk` dan error con una ubicación

Estos comandos necesitan una variable (`<context.target>`, `<npc.location>`...) como destino, no coordenadas escritas a mano. Ver [Variables de texto](/referencia/variables).

## Un `narrate` con dos puntos en el mensaje no funciona / rompe el script

Por ejemplo `- narrate "Modo: <define.modo>"`. Esto **no es un bug de Puppeteer, es una regla de YAML**: un `:` seguido de espacio se interpreta como parte de la estructura del archivo, incluso dentro de las comillas (porque la línea empieza sin comillas, en `narrate `, así que las comillas que vienen después no cuentan como "encomillar la línea entera" a ojos de YAML). El propio script deja de cargarse bien y `/puppeteer reload` avisará del error.

**Solución:** evita `: ` dentro del mensaje. Usa `->` o `-` en su lugar:

```yaml
- narrate "&7Modo -> <define.modo>"   # bien
```
