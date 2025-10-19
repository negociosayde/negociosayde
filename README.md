# Negocios Ayde - Maqueta React

Proyecto React (Vite) generado como maqueta para la tienda **Negocios Ayde**.
Incluye: Home, Catálogo, Carrito simulado, Contacto, Blog, Ubicación genérica, políticas y assets.

## Cómo iniciar localmente

1. Instala dependencias:
```
npm install
```
2. Ejecuta en desarrollo:
```
npm run dev
```
3. Genera build:
```
npm run build
```

## Despliegue automático a GitHub Pages (opcional)

Este proyecto incluye instrucciones para publicar la carpeta `dist` en GitHub Pages. Puedes usar `gh-pages` o configurar GitHub Actions.

Para usar `gh-pages` (instala dependencia `gh-pages`):
```
npm i -D gh-pages
npm run build
npm run deploy
```

## Archivos incluidos
- `src/` - código fuente React
- `public/` - logos SVG
- `catalogo_negocios_ayde.csv` - catálogo inicial
- `.github/workflows/deploy.yml` - workflow ejemplo (para deploy automático) 

## Notas
- Esta es una maqueta sin integración de pagos. Para producción se recomienda migrar a un backend o a WooCommerce si se requiere pasarelas y panel de administración.
- WhatsApp: +51 951215589
