# Combate

La sección `combat:` de un `assignment` convierte al NPC en un combatiente completo: elige a quién atacar, se acerca, cambia de arma según la distancia, dispara flechas de verdad apuntando al objetivo, recibe daño, se cura poco a poco, muere y reaparece más tarde. No hace falta ningún plugin adicional para esto — es todo de Puppeteer.

## Ejemplo completo

```yaml
guardian:
  type: assignment

  combat:
    health: 40
    respawn: 100
    regen-rate: 100

    targets:
      - players
      - "mythicmob:goblin_archer"
    ignore:
      - "permission:puppeteer.safe"
    aggro-range: 16

    weapons:
      - item: BOW
        range: [8, 30]
        animation: draw_bow
        projectile: ARROW
        damage: 4
        sound: ENTITY_ARROW_SHOOT
      - item: DIAMOND_SWORD
        range: [0, 8]
        animation: slash
        damage: 6
        sound: ENTITY_PLAYER_ATTACK_SWEEP

    on-target: guardian_engage

    greeting: "&7Circula, viajero."
    warning: "&cNo dieres un paso más."
    greet-range: 10
    greet-rate: 100

    # squad: guardia_norte
    # guard: "player:Javivi"
    # guard-range: 7
    # region: patio_castillo

  events:
    on spawn:
      - walk path:patrol_route

    on death:
      - animate die
      - givemoney <context.killer> 100

guardian_engage:
  type: task
  script:
    - narrate "&7*el guardián desenvaina*"
    - animate ready
```

En las secciones de abajo se explica cada clave por separado.

## Vida, muerte y regeneración

| Clave | Por defecto | Qué hace |
|---|---|---|
| `health` | la vida del mob base | Vida máxima del NPC mientras esté en combate. |
| `respawn` | `100` (ticks = 5 segundos) | Cuánto tarda en reaparecer tras morir, en el mismo sitio donde murió. `0` = no reaparece solo (hay que reasignarlo o reaparecerlo a mano); un número negativo = se destruye permanentemente al morir, sin reaparecer. |
| `regen-rate` | `100` (ticks = 5 segundos) | Cada cuántos ticks recupera 1 punto de vida, mientras esté por debajo del máximo. `0` desactiva la regeneración. |

Por defecto, un NPC de combate **sí puede morir** — Puppeteer lo hace vulnerable en cuanto tiene una sección `combat:` (los NPCs de Citizens son invulnerables por defecto si no se toca nada).

## A quién ataca

| Clave | Qué hace |
|---|---|
| `targets` | Lista de a quién puede atacar. |
| `ignore` | Lista de excepciones — nunca ataca a quien cumpla alguna de estas, aunque cumpla `targets`. |
| `aggro-range` | Distancia (en bloques) a la que detecta posibles objetivos. Por defecto `16`. |

Cada entrada de `targets`/`ignore` puede ser:

- `players` — cualquier jugador (los que estén en modo creativo o espectador quedan siempre excluidos, se ataque o no).
- `"mythicmob:<nombre>"` — un tipo concreto de mob de MythicMobs (necesita MythicMobs instalado). Ejemplo: `"mythicmob:goblin_archer"`.
- `"permission:<permiso>"` — jugadores con ese permiso.
- El nombre de un tipo de entidad vanilla, por ejemplo `ZOMBIE` o `SKELETON`.

## Armas

`weapons` es una lista de armas posibles, cada una con el rango de distancia en el que se usa. El NPC va cambiando de arma sola según a qué distancia esté su objetivo.

| Clave del arma | Qué hace |
|---|---|
| `item` | El material del arma (`DIAMOND_SWORD`, `BOW`, etc.) — también es lo que lleva equipado en la mano. |
| `range` | `[mínimo, máximo]` en bloques — a qué distancia se usa esta arma. |
| `animation` | Animación a reproducir al usarla (necesita BetterModel). |
| `projectile` | **Solo para armas a distancia.** El tipo de proyectil a disparar (`ARROW`, `SNOWBALL`, `TRIDENT`...). Si no pones esto, el arma se trata como cuerpo a cuerpo. |
| `damage` | Daño de esta arma. Si no lo pones, Puppeteer usa un valor razonable según el tipo de arma. |
| `sound` | Sonido a reproducir al atacar/disparar (nombre de la lista de sonidos de Minecraft, por ejemplo `ENTITY_ARROW_SHOOT`). |

**Cuerpo a cuerpo:** el NPC solo golpea cuando está realmente pegado al objetivo (un par de bloques), sin importar lo grande que sea el `range` que hayas puesto — ese rango solo decide cuándo elige esa arma para acercarse, no la distancia real del golpe.

**A distancia:** el NPC dispara de verdad, apuntando al objetivo, y solo si lo tiene a la vista. Si no tiene línea de visión o está fuera del rango del arma, se acerca en vez de disparar a ciegas.

`on-target` es opcional: el nombre de una `task` que se ejecuta la primera vez que el NPC fija un objetivo nuevo (útil para un mensaje o animación de "te he visto").

## Saludos y avisos

| Clave | Por defecto | Qué hace |
|---|---|---|
| `greeting` | ninguno | Mensaje a un jugador cercano al que el NPC **no** vaya a atacar. |
| `warning` | ninguno | Mensaje a un jugador cercano al que **sí** vaya a atacar. |
| `greet-range` | `10` | Distancia a la que saluda/avisa. |
| `greet-rate` | `100` (ticks) | Cuánto tiempo debe pasar antes de poder volver a saludar/avisar al mismo jugador. |

## Escuadras (`squad`)

Si varios NPCs tienen el mismo valor de `squad`, en cuanto uno de ellos fija un objetivo nuevo, se lo comunica a los demás del escuadrón que no estén ya ocupados con otro objetivo — como si se avisaran entre ellos.

```yaml
combat:
  squad: guardia_norte
```

## Vigilar a alguien (`guard`)

Cuando el NPC no está en combate, puede quedarse cerca de un jugador o de otro NPC concreto en vez de quedarse quieto — y nunca lo va a atacar, aunque cumpla `targets`.

| Clave | Por defecto | Qué hace |
|---|---|---|
| `guard` | ninguno | `"player:<nombre>"` o `"npc:<id>"` — a quién vigila. |
| `guard-range` | `7` | Cuánto se puede alejar antes de acercarse de nuevo. |

```yaml
combat:
  guard: "player:Javivi"
  guard-range: 7
```

## Restringir a una zona (`region`)

Con **WorldGuard** instalado, puedes impedir que el NPC persiga o vigile fuera de una región concreta:

```yaml
combat:
  region: patio_castillo
```

Si el objetivo (o a quien vigila) se sale de esa región, el NPC simplemente no le sigue — se queda donde está.
