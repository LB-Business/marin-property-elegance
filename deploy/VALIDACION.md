# Validación ejecutada — 05/11/2026

- Fuente: ZIP adjunto Marin-Propiedades-Actual(2).zip. Se normalizaron separadores Windows de sus rutas al extraer.
- Node v24.22.1; npm ci finalizó con código 0 (361 paquetes). Se mantuvo package-lock.json sin cambios. npm informó deprecaciones existentes de tsconfck y recharts; no se actualizaron dependencias ajenas al trabajo.
- npm run build: código 0. Ejecutó generación de sitemap desde la API real, Vite y prerenderizado de la política. Sitemap final: 20 URLs, sin duplicados.
- npx tsc --noEmit: código 0.
- bash -n deploy/publicar-privacidad.sh: código 0. Sintaxis revisada; no ejecutado contra el VPS.
- Vite preview + peticiones HTTP locales: /, /politica-de-privacidad, /politica-de-privacidad/ y /sitemap.xml devuelven 200. Las dos rutas de política contienen el texto legal completo en la respuesta HTML.
- Inspección automatizada del HTML: un h1, un title, una descripción, canonical absoluto correcto, lang=es, IDs únicos, anclas con destino, enlace del Footer y mención de Facebook e Instagram.
- Revisión del código responsive: contenedor existente; tipografía escalable; índice apilado y grilla a partir de lg; sin anchos mínimos fijos en contenido. La prueba visual y de interacción en navegador queda pendiente: Chromium no estuvo disponible y su descarga devolvió un archivo inválido. No se afirma una auditoría completa de accesibilidad.
- Sin conexión SSH ni push ni despliegue en producción. El enlace público no pudo verificarse desde la herramienta web. El script preparado verifica el contenido publicado y restaura los archivos anteriores si las comprobaciones fallan.

El mensaje de WhatsApp es un borrador condicional para utilizar una vez publicada y verificada la página, no un anuncio de publicación ya realizada.
