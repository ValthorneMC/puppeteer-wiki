# Instalación

## Lo imprescindible

Puppeteer necesita **Citizens** instalado en el servidor — los NPCs que controla son NPCs de Citizens. Sin Citizens, Puppeteer ni siquiera arrancará.

El servidor debe correr **Folia o Paper 1.21.11** (o una versión compatible) y **Java 25**.

## Lo opcional

Puppeteer se conecta automáticamente con estos plugins **si los tienes instalados**, y sigue funcionando perfectamente si no los tienes — simplemente esa parte del script no hará nada:

| Plugin | Para qué lo usa Puppeteer |
|---|---|
| **BetterModel** | Reproducir animaciones en el modelo del NPC. |
| **MythicMobs** | Que un NPC pueda tener como objetivo a un mob de MythicMobs, o lanzar una de sus habilidades. |
| **VEconomy** | Dar dinero a un jugador desde un script (por ejemplo, al morir el NPC). |
| **WorldGuard** | Que un NPC no persiga ni vigile fuera de una región concreta. |

No hace falta configurar nada para que Puppeteer los detecte: si el plugin está activo, funciona; si no, esa acción simplemente se ignora (y te avisa en el chat si intentas usar un comando que lo necesita, en vez de fallar en silencio).

## Dónde van los archivos

Una vez instalado el `.jar` de Puppeteer en la carpeta `plugins/` y arrancado el servidor una vez, se crea esta estructura dentro de `plugins/Puppeteer/`:

```
plugins/Puppeteer/
├─ scripts/     ← aquí van tus archivos .yml con el comportamiento de los NPCs
└─ paths/       ← aquí se guardan las rutas de patrulla creadas con /puppeteer path
```

Todo lo que hagas en esta wiki consiste en crear o editar archivos `.yml` dentro de `scripts/`, y luego recargarlos con `/puppeteer reload` (o reiniciar el servidor) para que se apliquen.

## Comprobar que se cargó bien

En la consola del servidor, al arrancar, Puppeteer escribe una línea como esta:

```
[Puppeteer] Puppeteer enabled. Hooks: model=BetterModel, mythic=MythicMobs, economy=VEconomy, worldguard=WorldGuard
```

Si alguno de esos plugins opcionales no está instalado, aparecerá como `(not detected yet)` junto a su nombre — es normal, simplemente significa que esa integración concreta está desactivada.

Siguiente paso: [Tu primer NPC](/guia/primer-npc).
