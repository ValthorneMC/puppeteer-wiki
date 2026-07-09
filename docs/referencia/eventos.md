# Eventos (disparadores)

Dentro de la sección `events:` de un `assignment`, cada entrada empieza por `on <evento>:`. Esta es la lista completa de eventos disponibles y qué variables de contexto trae cada uno (ver [Variables de texto](/referencia/variables) para cómo usarlas).

## Ciclo de vida del NPC

### `on spawn:`
Cuando el NPC aparece en el mundo (al arrancar el servidor, al cargar el chunk, o al reaparecer tras morir).

### `on despawn:`
Cuando el NPC desaparece (chunk descargado, servidor parándose, etc. — no al morir, para eso está `on death:`).

### `on death:`
Cuando el NPC muere. Si lo mató un jugador, `<context.killer>` es ese jugador.

```yaml
on death:
  - animate morir
  - givemoney <context.killer> 100
```

### `on damaged:`
Cada vez que el NPC recibe daño. `<context.damager>` es quien/lo que le hizo daño.

## Interacción con jugadores

### `on sees player:`
Cuando un jugador entra en el campo de visión del NPC. `<context.target>` es ese jugador.

```yaml
on sees player:
  - narrate "&c¡Alto ahí!" targets:<context.target>
```

### `on click:` y `on right click:`
Ambos se disparan a la vez con el clic derecho. `<context.clicker>` es quien ha hecho clic.

### `on left click:`
Con el clic izquierdo. También trae `<context.clicker>`.

## Repetitivo: `on tick`

Se comprueba constantemente mientras el NPC está asignado, con dos parámetros opcionales en la propia cabecera:

```yaml
on tick every:20t chance:5:
  - animate mirar_alrededor
```

- `every:` cada cuántos ticks se comprueba (`20t` = 1 segundo; también admite `3s` como forma de escribir segundos).
- `chance:` probabilidad de que ocurra cada vez que se comprueba, en tanto por ciento (`5` = 5%).

Con el ejemplo de arriba: cada segundo, hay un 5% de probabilidad de que el NPC haga esa animación — de media, una vez cada 20 segundos, pero de forma aleatoria, no puntual.

## Del motor de combate

Estos tres solo tienen sentido si el `assignment` tiene una sección `combat:` (ver [Combate](/referencia/combate)):

### `on target acquired:`
Cuando el NPC fija un nuevo objetivo de combate. `<context.target>` es ese objetivo.

### `on target lost:`
Cuando el NPC pierde su objetivo actual (se escapó, murió, dejó de cumplir las condiciones de `combat.targets`, etc.).

### `on path complete:`
Cuando el NPC termina de recorrer una ruta de patrulla que no bucla (ver [Rutas de patrulla](/guia/rutas)). `<context.path>` es el nombre de la ruta.
