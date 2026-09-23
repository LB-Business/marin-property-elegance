# Marin Propiedades — Construcciones y sitemap

## Cambios
- Construcciones muestra las fotos reales de las publicaciones de tipo construcción desde la misma API de LB Business. Galería compacta 16:9 (máximo 768 px cuando hay un solo proyecto), con flechas para recorrer todas las fotos y contador. El enlace «Ver proyecto» abre la ficha. Se eliminaron los textos de servicios y etapas de esa sección.
- Se conserva el filtro existente: las construcciones no aparecen en «Todas las propiedades».
- `public/robots.txt` permite el rastreo y declara el sitemap.
- `public/sitemap.xml` incluye inicio, listado y fichas publicadas (también construcciones). No incluye anclas ni combinaciones de filtros.
- `scripts/generate-sitemap.mjs` actualiza el sitemap desde la API pública. Usa las fechas de modificación existentes y aborta si la API falla para no sobrescribirlo con datos incompletos.

## Compilar y publicar
Requiere Node.js 22.12 o superior compatible con Vite 8.

```powershell
npm ci
npm run build
```

Publicar el contenido de `dist` en el hosting habitual. Mantener la configuración SPA que sirve index.html para las rutas de propiedades, dando prioridad a los archivos existentes robots.txt y sitemap.xml.

## Actualizaciones de propiedades
La galería consulta la API al abrir la web. El sitemap es estático: se regenera con cada `npm run build` y debe publicarse nuevamente tras altas/bajas de propiedades.

Para actualizar solamente los archivos de rastreo:

```powershell
npm run sitemap
```

Publicar `public/sitemap.xml` y `public/robots.txt` en la raíz de la web. También se puede programar en el servidor `node scripts/generate-sitemap.mjs /ruta/real/de/la/web` para actualizarlos periódicamente sin recompilar (reemplazar la ruta por la raíz real del sitio).

## Google Search Console
Una vez publicado, comprobar que estas direcciones muestran texto/XML y no la landing:
- https://marinpropiedades.com.ar/robots.txt
- https://marinpropiedades.com.ar/sitemap.xml

En la propiedad del dominio, abrir «Sitemaps», ingresar `sitemap.xml` y enviar. No se envía robots.txt en ese formulario. El sitemap facilita descubrir URLs; no garantiza indexación.

Referencia: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=es

## Navegación entre construcciones
Se muestra un proyecto a la vez. Las flechas grandes exteriores cambian de proyecto y las pequeñas interiores cambian de foto. Ambas quedan centradas respecto a la imagen. Al cambiar de proyecto se vuelve a su primera foto. Con un solo proyecto, las flechas exteriores aparecen deshabilitadas. El contador inferior indica el proyecto actual.
