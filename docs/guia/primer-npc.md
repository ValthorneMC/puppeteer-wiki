# Tu primer NPC

Vamos a crear un NPC muy sencillo — un vendedor que saluda cuando le haces clic — de principio a fin.

## 1. Crea el NPC con Citizens

Como siempre, con Citizens:

```
/npc create Mercader
```

Colócalo, dale el modelo/skin que quieras con los comandos de Citizens de siempre (`/npc skin`, `/npc model`, etc.) — Puppeteer no toca nada de eso, solo el comportamiento.

## 2. Escribe el script

Crea un archivo de texto llamado `mercader.yml` dentro de `plugins/Puppeteer/scripts/`, con este contenido:

```yaml
mercader:
  type: assignment

  events:
    on right click:
      - random:
          - - narrate "&a¡Bienvenido a la tienda!" targets:<context.clicker>
          - - narrate "&a¿Buscas algo en particular?" targets:<context.clicker>

    on left click:
      - narrate "&7¡Hasta luego!" targets:<context.clicker>
```

Qué hace cada parte:

- `mercader:` es el nombre del script. Lo usarás luego para asignarlo al NPC.
- `type: assignment` indica que este script se puede asignar a un NPC (es el tipo que usarás casi siempre).
- `events:` es la lista de cosas a las que reacciona el NPC.
- `on right click:` — cuando alguien le hace clic derecho, elige una de las dos frases al azar (`random:`) y se la dice solo a quien ha hecho clic (`targets:<context.clicker>`).
- `on left click:` — con clic izquierdo, se despide.

No hace falta que entiendas nada más que esto para empezar a escribir tus propios scripts — en [Conceptos básicos](/guia/conceptos) se explica cada pieza con más calma, y en [Acciones de script](/referencia/acciones) tienes la lista completa de todo lo que puedes hacer.

## 3. Carga el script

En el juego o en la consola:

```
/puppeteer reload
```

Verás un mensaje confirmando cuántos scripts se han cargado. Si escribiste algo mal en el YAML, te avisará en el chat/consola con el motivo en vez de romper todo lo demás.

## 4. Asígnaselo al NPC

Selecciona el NPC (con el bastón de selección de Citizens, o `/npc select`) y escribe:

```
/puppeteer assign mercader
```

Puppeteer completa el nombre automáticamente al pulsar Tab, así que no hace falta que lo recuerdes de memoria.

¡Listo! Haz clic derecho e izquierdo al NPC para comprobarlo.

## Para deshacerlo

Si quieres quitarle el script a un NPC (que deje de tener cualquier comportamiento de Puppeteer):

```
/puppeteer unassign
```

## Siguiente paso

Este ejemplo no tiene combate — para un NPC que persigue, pelea, muere y reaparece, ve directamente a [Combate](/referencia/combate), que trae un ejemplo completo de guardia listo para copiar y adaptar.
