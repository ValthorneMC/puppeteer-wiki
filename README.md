# Puppeteer Wiki

Wiki de administración de Puppeteer (VitePress), para admins que escriben scripts sin programar.

## Desarrollo local

```
npm install
npm run docs:dev
```

Abre `http://localhost:5173`.

## Publicar

Se despliega solo, vía GitHub Actions (`.github/workflows/deploy.yml`), en cada push a `main` que toque algo dentro de `puppeteer-wiki/`. Para que funcione en un repositorio:

1. En **Settings → Pages → Build and deployment → Source**, elige **GitHub Actions**.
2. Si el sitio se sirve desde `usuario.github.io/<nombre-del-repo>/` (páginas de proyecto), confirma que `base` en `docs/.vitepress/config.mts` coincide con `/<nombre-del-repo>/`. Si se sirve desde la raíz de un dominio propio o de una página de organización (`usuario.github.io/`), cambia `base` a `/`.

## Estructura

```
puppeteer-wiki/
├─ docs/               ← el contenido de la wiki (lo que se publica)
│  ├─ .vitepress/       ← configuración del sitio (nav, sidebar...)
│  ├─ guia/             ← tutoriales paso a paso
│  ├─ referencia/       ← referencia de comandos, acciones, eventos, variables, combate
│  └─ ayuda/            ← solución de problemas, FAQ, roadmap
└─ .github/workflows/  ← despliegue automático a GitHub Pages
```
