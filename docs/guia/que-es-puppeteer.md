# ¿Qué es Puppeteer?

Puppeteer es el plugin que da comportamiento a los NPCs del servidor. En vez de configurar cada cosa con comandos sueltos, escribes un archivo de texto (un **script**) que describe todo lo que ese NPC debe hacer, y se lo asignas. A partir de ahí, el NPC vive solo: patrulla, saluda, ataca, se defiende, muere y reaparece según lo que hayas escrito.

Piensa en un script como la "personalidad" de un NPC, guardada en un archivo. Puedes tener varios scripts distintos (un guardia, un vendedor, un aldeano que solo saluda) y asignar cada uno al NPC que corresponda. Si algún día quieres cambiar cómo se comporta un guardia, editas ese único archivo y todos los guardias que lo usan cambian a la vez.

## ¿Qué puede hacer un NPC con Puppeteer?

- **Reaccionar a lo que pasa a su alrededor**: que te vea, que le hables, que le ataquen, que muera, que llegue a un sitio.
- **Hablar**: mensajes fijos o elegidos al azar entre varias frases.
- **Moverse**: mirar hacia algo, caminar a un punto, seguir una ruta de patrulla previamente grabada.
- **Pelear de verdad**: elegir a quién atacar, cambiar de arma según la distancia, perseguir, disparar flechas apuntando de verdad, recibir daño, curarse poco a poco, morir y volver a aparecer más tarde.
- **Animarse**: reproducir animaciones de su modelo (si usas BetterModel).
- **Repartir recompensas**: dar dinero al matarlo (si usas VEconomy) o lanzar habilidades de MythicMobs.

Todo esto se escribe en un único archivo `.yml` por script, dentro de la carpeta `scripts/` del plugin. No hace falta reiniciar el servidor para probar cambios: existe un comando para recargar todos los scripts al vuelo.

## ¿Para quién es esta wiki?

Para quien vaya a **escribir o editar scripts de Puppeteer**, sin que haga falta saber programar. Aquí no vas a encontrar explicaciones de cómo está construido el plugin por dentro — solo lo que necesitas para escribir un script y que funcione: qué opciones existen, qué significan, y ejemplos completos que puedes copiar y adaptar.

Sigue con [Instalación](/guia/instalacion) si aún no tienes Puppeteer en marcha, o pasa directamente a [Tu primer NPC](/guia/primer-npc) si ya lo tienes.
