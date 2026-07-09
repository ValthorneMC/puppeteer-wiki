# Rutas de patrulla

Una ruta es un recorrido guardado, hecho de varios puntos ("nodos"), por el que un NPC puede caminar. Se crea in-game caminando tú mismo por el recorrido, y luego se referencia desde un script con `walk path:<nombre>`.

Puppeteer calcula el camino real entre cada dos nodos (esquivando obstáculos, subiendo escaleras, etc.) — tú solo marcas por dónde debe pasar, aproximadamente.

## Crear una ruta

1. Colócate en el punto donde quieres que empiece la ronda y escribe:

   ```
   /puppeteer path create ronda_norte
   ```

2. Camina hasta el siguiente punto del recorrido y marca ese punto:

   ```
   /puppeteer path node
   ```

   Repite este paso en cada punto por el que quieras que pase el NPC. Cuantos más puntos marques, más se ajustará el recorrido a lo que quieres (por ejemplo, para que rodee un edificio en vez de intentar atravesar la pared en línea recta).

3. Cuando termines, guarda la ruta:

   ```
   /puppeteer path save
   ```

Si te equivocas a mitad de camino y quieres empezar de cero, usa `/puppeteer path cancel`.

## Hacer que un NPC recorra la ruta que bucle o no, y a qué velocidad

Por defecto una ruta creada así no bucla y va a velocidad normal. Si quieres que el NPC la repita en bucle (que vuelva al primer punto al llegar al último) y/o ajustar la velocidad, indícalo al crearla:

```
/puppeteer path create ronda_norte true 1.2
```

El primer valor (`true`/`false`) es si bucla; el segundo es la velocidad (1.0 es la normal).

## Usar la ruta en un script

Desde cualquier acción de un script, con `walk path:<nombre>`:

```yaml
guardia:
  type: assignment
  events:
    on spawn:
      - walk path:ronda_norte
```

Con esto, en cuanto el NPC aparece, empieza a recorrer la ruta.

## Reaccionar a que termine la ronda

Si la ruta **no** bucla, cuando el NPC termina de recorrerla se dispara el evento `path complete`, por si quieres que haga algo al terminar (sentarse, decir algo, esperar un rato):

```yaml
  events:
    on path complete:
      - narrate "&7*termina la ronda y se detiene a descansar*"
```

Si la ruta bucla, este evento nunca se dispara — el NPC simplemente vuelve a empezar sin parar.
