# Conceptos básicos

## Contenedores: los "bloques" de un script

Cada archivo `.yml` puede tener uno o varios bloques de primer nivel. Cada bloque tiene un nombre (el que tú elijas) y un `type:` que dice qué es:

| `type` | Para qué sirve |
|---|---|
| `assignment` | El comportamiento completo de un NPC. Es el que se asigna con `/puppeteer assign`. |
| `task` | Una secuencia de acciones reutilizable, para invocar desde un evento con `run <nombre>`. Útil para no repetir el mismo bloque de acciones en varios sitios. |

Puedes tener el `assignment` principal y varias `task` auxiliares en el mismo archivo, o repartirlas en archivos distintos — Puppeteer lee todos los `.yml` de la carpeta `scripts/` (y sus subcarpetas) por igual.

```yaml
guardia:
  type: assignment
  events:
    on spawn:
      - run saludo_inicial   # llama a la task de abajo

saludo_inicial:
  type: task
  script:
    - narrate "&7*se acomoda la armadura*"
```

## Eventos: a qué reacciona el NPC

Dentro de un `assignment`, la sección `events:` es una lista de "cuando pase esto, haz esto otro". Cada entrada empieza por `on <nombre del evento>:` seguida de la lista de acciones a ejecutar. La lista completa de eventos disponibles (que te ve, que le atacan, que muere, que llega a un sitio...) está en [Eventos (disparadores)](/referencia/eventos).

## Acciones en orden, una tras otra

Dentro de cada evento (o `task`), las acciones se ejecutan en el orden en que están escritas, de arriba abajo, como una receta:

```yaml
- narrate "&7*saca la espada*"
- wait 1s
- animate ready
```

Esto dice el mensaje, espera un segundo real, y luego reproduce la animación — no las tres cosas a la vez. El comando `wait` es justo para eso: pausar la secuencia sin que el NPC se quede "congelado" para el resto del servidor.

La lista completa de acciones disponibles (hablar, moverse, atacar, animarse, dar dinero...) está en [Acciones de script](/referencia/acciones).

### Condiciones: `if` / `else`

Puedes hacer que un grupo de acciones solo ocurra si se cumple una condición:

```yaml
- if <context.target.dist> < 20:
  - narrate "&c¡Te tengo!"
- else:
  - narrate "&7Anda, vuelve por aquí."
```

### Al azar: `random`

Y puedes hacer que se elija una de varias posibilidades cada vez, con la misma probabilidad cada una:

```yaml
- random:
    - - narrate "Frase uno"
    - - narrate "Frase dos"
    - - narrate "Frase tres"
```

(Fíjate en los dos guiones seguidos `- -`: cada opción es en sí misma una lista de acciones, así que una opción puede tener varias líneas si quieres.)

## Variables de texto (`<...>`)

Cuando escribes algo entre `< >`, Puppeteer lo sustituye por un valor real en el momento de ejecutarse. Por ejemplo, `<context.clicker>` se convierte en el jugador que acaba de hacer clic al NPC, y `<context.target.dist>` en la distancia (en bloques) hasta el objetivo actual.

No hace falta memorizar todas — la lista completa está en [Variables de texto (tags)](/referencia/variables) — pero conviene saber que existen y que se usan tanto para mostrar texto (`narrate "Hola <context.clicker.name>"`) como para tomar decisiones (`if <context.target.dist> < 20:`).

Para un NPC de combate completo (salud, persecución, disparo de flechas...), ve a [Combate](/referencia/combate).
