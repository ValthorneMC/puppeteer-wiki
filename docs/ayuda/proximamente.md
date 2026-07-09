# Qué queda por llegar

Puppeteer está en desarrollo activo. Esto es lo que ya existe en el archivo de script pero todavía no hace nada (para que no te sorprenda si lo pruebas), y lo que está pensado para más adelante.

## Ya se puede escribir, pero aún no hace efecto

- **`type: event`** — un contenedor pensado para reacciones globales no ligadas a un NPC concreto (por ejemplo, algo que ocurra en todo el mundo). Se puede escribir y se guarda sin dar error, pero de momento no se dispara desde ningún sitio.
- **Leer una variable definida con `define`** — el comando `define` guarda el valor, pero todavía no hay ninguna variable de texto para volver a leerlo dentro del propio script.
- **`type: procedure`** invocada desde una variable de texto (por ejemplo algo como `<proc[nombre]>`) — el contenedor se puede escribir igual que una `task`, pero llamarlo desde una variable aún no está disponible.

## Pensado para más adelante

- Aplicar el modelo de BetterModel al NPC directamente desde el script (hoy en día el modelo se pone aparte, con `/npc model`; Puppeteer solo controla sus animaciones).
- Indicadores/hologramas por-jugador con PacketEvents.
- Una API pública para que otros plugins del servidor puedan interactuar con los NPCs de Puppeteer.

Si necesitas alguna de estas antes de que llegue, dilo — se prioriza según lo que haga falta en el servidor.
