# Cómo funciona

El comportamiento de un NPC se define en un archivo `.yml` (un **script**) dentro de `plugins/Puppeteer/scripts/`, y se asigna al NPC con `/puppeteer assign`. A partir de ahí el NPC actúa solo según lo escrito: patrulla, saluda, ataca, se defiende, muere y reaparece.

Un script se puede reutilizar en varios NPCs (todos los guardias usan el mismo `guardia.yml`, por ejemplo) y editarlo cambia a todos los que lo usan a la vez.

## Qué puede hacer un NPC

- **Reaccionar**: verte, que le hables, que le ataquen, morir, llegar a un sitio.
- **Hablar**: mensajes fijos o elegidos al azar.
- **Moverse**: mirar, caminar a un punto, seguir una ruta de patrulla grabada.
- **Pelear**: elegir objetivo, cambiar de arma según distancia, perseguir, disparar flechas apuntando de verdad, recibir daño, curarse, morir y reaparecer.
- **Animarse**: reproducir animaciones de su modelo (con BetterModel).
- **Repartir recompensas**: dar dinero al morir (VEconomy) o lanzar habilidades de MythicMobs.

`/puppeteer reload` aplica los cambios de cualquier script sin reiniciar el servidor.

Sigue con [Instalación](/guia/instalacion) o directo a [Tu primer NPC](/guia/primer-npc).
