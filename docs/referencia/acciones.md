# Acciones de script

Esta es la lista completa de acciones que puedes usar dentro de la lista de un evento o de una `task`. Todas se escriben como una línea de texto (con guion delante, por ser un elemento de lista en YAML).

Un apunte sobre `look`/`walk`: cuando piden un "destino", ese destino tiene que venir de una variable (`<context.target>`, `<npc.location>`...), no de unas coordenadas escritas a mano — Puppeteer no admite todavía `walk mundo,100,64,200` directamente. Ver [Variables de texto](/referencia/variables) para las que puedes usar.

## Hablar

### `narrate "<mensaje>" [targets:<jugador>]`

Dice un mensaje por chat. Admite colores con `&` (por ejemplo `&c` para rojo, `&7` para gris).

- Sin `targets:`, lo oyen todos los jugadores a menos de 32 bloques del NPC.
- Con `targets:<algo>`, se lo dice solo a ese jugador concreto.

```yaml
- narrate "&c¡Alto ahí!"
- narrate "&aBienvenido" targets:<context.clicker>
```

## Animación

### `animate <nombre> [loop]`

Reproduce una animación del modelo del NPC (BetterModel). Añade `loop` al final si quieres que se repita en bucle en vez de reproducirse una sola vez.

```yaml
- animate saludo
- animate patrulla loop
```

### `stopanimate <nombre>`

Detiene una animación que estuviera en bucle.

## Movimiento

### `look <destino>`

Orienta la cabeza/cuerpo del NPC hacia algo.

```yaml
- look <context.target>
```

### `walk <destino>`

Camina hacia un jugador, otra entidad, o un punto.

```yaml
- walk <context.target>
```

### `walk path:<nombre>`

Recorre una ruta de patrulla ya creada. Ver [Rutas de patrulla](/guia/rutas).

```yaml
- walk path:ronda_norte
```

## Combate manual

### `attack <objetivo>`

Fija un objetivo de combate para el NPC. A partir de ahí, si el `assignment` tiene una sección `combat:`, el propio motor de combate se encarga de perseguir, elegir arma y atacar — esta acción solo decide **a quién**. Ver [Combate](/referencia/combate) para toda la configuración de combate.

```yaml
- attack <context.target>
```

### `mythicskill <habilidad> [at:<objetivo>]`

Lanza una habilidad de MythicMobs. Sin `at:`, apunta al objetivo de combate actual del NPC.

```yaml
- mythicskill DeathExplosion
```

### `givemoney <jugador> <cantidad>`

Da dinero a un jugador (VEconomy).

```yaml
- givemoney <context.killer> 100
```

## Control de flujo

### `wait <duración>`

Pausa la secuencia sin bloquear el servidor. Admite ticks (`20t`), segundos (`3s`) o un número a secas (interpretado como segundos, `3`).

```yaml
- wait 1s
```

### `run <task> [variable:valor...]`

Ejecuta una `task` (ver [Conceptos básicos](/guia/conceptos)) como una secuencia nueva, en paralelo a la que la llamó.

```yaml
- run saludo_inicial
```

### `define <nombre> <valor>`

Guarda un valor de texto con ese nombre, para el resto de la secuencia actual. (Nota: de momento este valor no se puede releer con una variable `<...>` desde el propio script — llegará en una fase futura. Por ahora, úsalo solo si de verdad lo necesitas.)

### `if <condición>:` / `else:`

Ejecuta un grupo de acciones solo si se cumple la condición (ver ejemplos en [Conceptos básicos](/guia/conceptos)). Las condiciones admiten comparaciones (`<`, `>`, `<=`, `>=`, `==`, `!=`) entre números o entre texto.

### `random:`

Elige al azar, con la misma probabilidad, uno de varios grupos de acciones (ver ejemplo en [Conceptos básicos](/guia/conceptos)).
