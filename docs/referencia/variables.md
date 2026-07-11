# Variables de texto (tags)

Cuando escribes algo entre `< >` en un script, Puppeteer lo sustituye por un valor real justo antes de ejecutar esa línea. Sirven tanto para mostrar texto como para tomar decisiones (`if <algo> < 20:`) o para indicar un destino (`walk <context.target>`).

## Con valor por defecto

Si añades `||` seguido de un texto, ese texto se usa cuando la variable no tiene ningún valor (por ejemplo, un objetivo que no existe):

```yaml
- narrate "Objetivo: <context.target.name||nadie>"
```

## `<context...>` — lo que trae el evento actual

Cada evento trae sus propias variables bajo `context` (ver la tabla en [Eventos](/referencia/eventos) para saber cuál trae cada uno):

| Variable | Qué es |
|---|---|
| `<context.target>` | El jugador/entidad visto, atacado, o el nuevo objetivo de combate, según el evento. |
| `<context.clicker>` | Quien ha hecho clic al NPC. |
| `<context.killer>` | Quien mató al NPC. |
| `<context.damager>` | Quien/lo que le hizo daño al NPC. |
| `<context.path>` | El nombre de la ruta de patrulla que se acaba de completar. |

A cada una de estas puedes añadirle un atributo con un punto, por ejemplo `<context.target.name>` o `<context.target.dist>` — ver la lista de atributos más abajo.

## `<npc...>` — el propio NPC

| Variable | Qué es |
|---|---|
| `<npc.name>` | El nombre del NPC. |
| `<npc.id>` | El ID de Citizens del NPC. |
| `<npc.location>` | Dónde está. |
| `<npc.target>` | Su objetivo de combate actual, si tiene uno. |

## Atributos de una entidad o jugador

Cuando una variable apunta a un jugador o entidad (`<context.target>`, `<context.clicker>`...), puedes añadir uno de estos atributos:

| Atributo | Qué da |
|---|---|
| `.name` | Su nombre. |
| `.uuid` | Su UUID. |
| `.type` | Su tipo de entidad (`PLAYER`, `ZOMBIE`, etc). |
| `.location` | Su posición. |
| `.dist` (o `.distance`) | La distancia en bloques hasta el NPC. |

```yaml
- if <context.target.dist> < 20:
  - narrate "&c¡Te tengo, <context.target.name>!"
```

## Atributos de una posición

Cuando una variable apunta a una posición (por ejemplo `<npc.location>` o `<context.target.location>`):

| Atributo | Qué da |
|---|---|
| `.x` / `.y` / `.z` | Coordenadas. |
| `.world` | Nombre del mundo. |

## `<define...>` — valores guardados con `define`

`<define.nombre>` devuelve el valor que guardaste antes con `- define nombre valor` en la misma secuencia.

```yaml
- define modo hostil
- narrate "&7Modo -> <define.modo>"
```

## `<papi[...]>` — placeholders de PlaceholderAPI

Cualquier placeholder de PlaceholderAPI, con su sintaxis normal entre `%...%`:

```yaml
- narrate "&7Hola, <papi[%player_name%]>"
```

::: warning Dos puntos dentro de un mensaje
`- narrate "Modo: <define.modo>"` **rompe el YAML** — un `:` seguido de espacio se interpreta
como parte de la estructura del archivo, incluso dentro de las comillas. Usa `->` o `-` en su
lugar. Más en [Solución de problemas](/ayuda/solucion-de-problemas).
:::
