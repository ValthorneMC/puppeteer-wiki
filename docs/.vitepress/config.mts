import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'es-ES',
  title: 'Puppeteer',
  description: 'Wiki de administración de Puppeteer, el motor de scripting de NPCs para Valthorne',

  base: '/puppeteer-wiki/',

  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Cómo funciona', link: '/guia/que-es-puppeteer' },
      { text: 'Índice completo', link: '/referencia/indice' },
      { text: 'Ayuda', link: '/ayuda/solucion-de-problemas' }
    ],

    sidebar: [
      {
        text: 'Guía',
        items: [
          { text: 'Cómo funciona', link: '/guia/que-es-puppeteer' },
          { text: 'Tu primer NPC', link: '/guia/primer-npc' },
          { text: 'Conceptos básicos', link: '/guia/conceptos' },
          { text: 'Rutas de patrulla', link: '/guia/rutas' }
        ]
      },
      {
        text: 'Referencia',
        items: [
          { text: 'Índice completo', link: '/referencia/indice' },
          { text: 'Comandos de consola', link: '/referencia/comandos-de-consola' },
          { text: 'Acciones de script', link: '/referencia/acciones' },
          { text: 'Eventos (disparadores)', link: '/referencia/eventos' },
          { text: 'Variables de texto (tags)', link: '/referencia/variables' },
          { text: 'Combate', link: '/referencia/combate' }
        ]
      },
      {
        text: 'Ayuda',
        items: [
          { text: 'Solución de problemas', link: '/ayuda/solucion-de-problemas' },
          { text: 'Preguntas frecuentes', link: '/ayuda/preguntas-frecuentes' },
          { text: 'Qué queda por llegar', link: '/ayuda/proximamente' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ValthorneMC/Puppeteer' }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      label: 'En esta página'
    },

    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente'
    },

    returnToTopLabel: 'Volver arriba',
    darkModeSwitchLabel: 'Apariencia',
    sidebarMenuLabel: 'Menú'
  }
})
