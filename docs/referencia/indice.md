# Índice completo

Todo lo que existe en Puppeteer ahora mismo: contenedores, acciones, eventos, variables y opciones de combate. Cada cosa con qué hace y un ejemplo mínimo. Para el detalle largo de cada sección, están los enlaces a la página correspondiente.

## Contenedores

| Tipo | Qué es | Ejemplo |
|---|---|---|
| `assignment` | El comportamiento completo de un NPC, el que se asigna con `/puppeteer assign`. `model:` (opcional) aplica un modelo de BetterModel al aparecer. | `guardia:` <br>`  type: assignment` <br>`  model: knight_armored` |
| `task` | Una secuencia reutilizable, se invoca con `run <nombre>`. | `saludo:` <br>`  type: task` <br>`  script:` <br>`    - narrate "Hola"` |

Más en [Conceptos básicos](/guia/conceptos).

## Acciones

Van dentro de `events:` o de una `task`, una por línea.

| Acción | Qué hace | Ejemplo |
|---|---|---|
| `narrate "<msg>" [targets:<jugador>]` | Habla por chat. Sin `targets:`, lo oye todo el mundo cerca. | `- narrate "&c¡Alto ahí!"` |
| `animate <nombre> [loop]` | Reproduce una animación del modelo (BetterModel). | `- animate saludo` |
| `stopanimate <nombre>` | Detiene una animación en bucle. | `- stopanimate patrulla` |
| `look <destino>` | Orienta la cabeza/cuerpo hacia algo. | `- look <context.target>` |
| `walk <destino>` | Camina hacia un jugador, entidad o punto. | `- walk <context.target>` |
| `walk path:<nombre>` | Recorre una ruta de patrulla guardada. | `- walk path:ronda_norte` |
| `attack <objetivo>` | Fija el objetivo de combate (el resto lo hace `combat:`). | `- attack <context.target>` |
| `mythicskill <habilidad> [at:<objetivo>]` | Lanza una habilidad de MythicMobs. | `- mythicskill DeathExplosion` |
| `givemoney <jugador> <cantidad>` | Da dinero (VEconomy). | `- givemoney <context.killer> 100` |
| `wait <duración>` | Pausa la secuencia (`20t`, `3s`, o un número = segundos). | `- wait 1s` |
| `run <task> [var:valor...]` | Ejecuta una `task` en paralelo. | `- run saludo_inicial` |
| `define <nombre> <valor>` | Guarda un valor para el resto de la secuencia, releíble con `<define.nombre>`. | `- define modo hostil` |
| `if <condición>:` / `else:` | Ramifica según una condición. | `- if <context.target.dist> < 20:` <br>`  - narrate "¡Te tengo!"` |
| `random:` | Elige al azar una de varias opciones. | `- random:` <br>`    - - narrate "Hola"` <br>`    - - narrate "¿Qué tal?"` |

Detalle completo con más ejemplos en [Acciones de script](/referencia/acciones).

## Eventos

Van bajo `events:`, cada uno como `on <evento>:` seguido de sus acciones.

| Evento | Cuándo salta | Variable de contexto |
|---|---|---|
| `on spawn:` | El NPC aparece. | — |
| `on despawn:` | El NPC desaparece (no al morir). | — |
| `on death:` | El NPC muere. | `<context.killer>` |
| `on damaged:` | El NPC recibe daño. | `<context.damager>` |
| `on sees player:` | Un jugador entra en su campo de visión. | `<context.target>` |
| `on click:` / `on right click:` | Clic derecho al NPC. | `<context.clicker>` |
| `on left click:` | Clic izquierdo al NPC. | `<context.clicker>` |
| `on tick every:20t chance:5:` | Comprobación repetida (cada N ticks, X% de probabilidad). | — |
| `on target acquired:` | Fija un objetivo de combate nuevo. | `<context.target>` |
| `on target lost:` | Pierde el objetivo de combate actual. | — |
| `on path complete:` | Termina una ruta que no bucla. | `<context.path>` |

```yaml
events:
  on sees player:
    - narrate "&c¡Alto ahí!" targets:<context.target>
```

Detalle completo en [Eventos (disparadores)](/referencia/eventos).

## Variables (`<...>`)

| Variable | Qué da |
|---|---|
| `<context.target>` | El jugador/entidad del evento actual (visto, objetivo, etc). |
| `<context.clicker>` | Quien ha hecho clic. |
| `<context.killer>` | Quien mató al NPC. |
| `<context.damager>` | Quien/lo que le hizo daño. |
| `<context.path>` | Nombre de la ruta completada. |
| `<npc.name>` / `<npc.id>` / `<npc.location>` / `<npc.target>` | Datos del propio NPC. |
| `<algo.name>` / `<algo.uuid>` / `<algo.type>` / `<algo.location>` | Atributos de una entidad/jugador. |
| `<algo.dist>` (o `.distance`) | Distancia en bloques hasta el NPC. |
| `<algo.x>` / `<algo.y>` / `<algo.z>` / `<algo.world>` | Atributos de una posición. |
| `<algo||valor>` | Valor por defecto si `algo` no existe. |
| `<define.nombre>` | El valor guardado con el comando `define`. |
| `<papi[%placeholder%]>` | Cualquier placeholder de PlaceholderAPI. |

```yaml
- narrate "Objetivo a <context.target.dist||0> bloques"
- narrate "&7Hola, <papi[%player_name%]>"
```

::: warning Cuidado con los dos puntos dentro de un mensaje
`- narrate "Modo: <define.modo>"` rompe el YAML — los dos puntos seguidos de espacio (`: `) se
interpretan como parte de la estructura del archivo, **incluso entre comillas**. Usa `->` o `-`
en su lugar: `- narrate "Modo -> <define.modo>"`. Más detalle en
[Solución de problemas](/ayuda/solucion-de-problemas).
:::

Detalle completo en [Variables de texto (tags)](/referencia/variables).

## Combate (`combat:`)

| Clave | Por defecto | Qué hace |
|---|---|---|
| `health` | vida del mob base | Vida máxima en combate. |
| `respawn` | `100` ticks | Ticks hasta reaparecer tras morir. `0` = no solo, negativo = destrucción permanente. |
| `regen-rate` | `100` ticks | Ticks entre cada +1 de vida. `0` desactiva la regeneración. |
| `targets` / `ignore` | — | A quién ataca / a quién nunca ataca (`players`, `"mythicmob:<t>"`, `"permission:<p>"`, tipo de entidad). |
| `aggro-range` | `16` | Distancia de detección. |
| `accuracy` | `0` | Dispersión máxima del disparo en bloques por eje. `0` = puntería perfecta. |
| `allow-knockback` | `true` | Si es `false`, el NPC no sale despedido al recibir un golpe. |
| `health-bar` | `true` | Indicador flotante con nombre y vida, visible para los cercanos (usa PacketEvents). |
| `weapons` | — | Lista de armas por rango: `item`, `range`, `animation`, `projectile`, `damage`, `sound`. |
| `on-target` | — | `task` a ejecutar al fijar un objetivo nuevo. |
| `greeting` / `warning` | — | Mensaje a quien no/sí vaya a atacar. |
| `greet-range` / `greet-rate` | `10` / `100` ticks | Alcance y frecuencia del saludo/aviso. |
| `squad` | — | NPCs que se avisan entre sí al fijar objetivo. |
| `guard` / `guard-range` | — / `7` | A quién vigila (`"player:<n>"`/`"npc:<id>"`) y hasta dónde se aleja. |
| `region` | — | Región de WorldGuard fuera de la que no persigue ni vigila. |

```yaml
combat:
  health: 40
  targets: [players]
  weapons:
    - item: DIAMOND_SWORD
      range: [0, 8]
      damage: 6
```

Detalle completo, con ejemplo entero de un guardia, en [Combate](/referencia/combate).
