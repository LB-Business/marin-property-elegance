# Política de Privacidad — Marín Propiedades

## Entrega

Ruta: https://marinpropiedades.com.ar/politica-de-privacidad

Se reutilizan Header, Footer, Montserrat, paleta y utilidades CSS existentes. El índice se apila en móvil y ocupa una columna lateral en escritorio. Hay enlace para saltar al contenido, encabezados jerárquicos, enlaces con foco e índice con anclas que compensan el Header fijo.

La ruta TanStack es pública, sin autenticación ni dependencia de la API de propiedades para mostrar el texto. El HTML generado contiene el texto completo, canonical absoluto, título, descripción y Open Graph; permite lectura sin JavaScript. También se genera una copia .html para servidores que resuelven extensiones. La URL canónica es siempre la URL sin extensión y sin barra final.

Se corrigió el shell heredado de TanStack Start: este proyecto usa Vite con createRoot, por lo que html/head/body deben pertenecer a index.html. HeadContent queda dentro del árbol React y se encarga de los metadatos. Se eliminaron el título y la descripción estáticos genéricos para evitar duplicarlos.

## Datos y alcance legal

Se usaron únicamente el nombre comercial, profesional, matrícula, dirección de atención y WhatsApp que ya aparecen en el Footer original. No se atribuyó a la dirección el carácter de domicilio legal ni se inventaron CUIT, sociedad, correo o inscripción de bases.

El texto contempla consultas y formularios instantáneos de Facebook/Instagram, finalidades, consentimiento, destinatarios, transferencias, seguridad, conservación, supresión y derechos. Las obligaciones y medidas están expresadas como reglas de tratamiento: el repositorio no permite auditar las prácticas internas. Antes de usarla en campañas, el titular debe confirmar quién es efectivamente el responsable de la base y su domicilio legal, así como que la operación cumple lo descrito. No equivale a una certificación de cumplimiento legal.

Fuentes oficiales consultadas el 05/11/2026:
- https://www.argentina.gob.ar/normativa/nacional/64790/actualizacion
- https://www.argentina.gob.ar/aaip/datospersonales/derechos
- https://www.facebook.com/legal/leadgen/tos (requiere inicio de sesión; no fue posible verificar el texto de las condiciones).

En cada formulario de Meta, configurar esta URL en el campo de política de privacidad y explicar para qué se solicitan los datos. La publicación de la página no modifica los formularios de Meta existentes ni garantiza la aprobación de anuncios.

## GitHub desde PowerShell

Extraer el ZIP de archivos modificados sobre el repositorio local existente, conservando sus carpetas. No reemplazar la carpeta .git. Revisar `git status` antes de continuar. Estos comandos no incluyen archivos ajenos al cambio:

```powershell
Set-Location "$env:USERPROFILE\Desktop\LB CodeWorks\marin-property-elegance"
git status --short
git diff --stat
git add -- index.html package.json src/main.tsx src/components/Footer.tsx src/components/PrivacyPage.tsx src/content/privacy.json src/routes/__root.tsx src/routes/politica-de-privacidad.tsx src/routeTree.gen.ts scripts/generate-sitemap.mjs scripts/prerender-privacy.mjs public/sitemap.xml deploy

git diff --cached --stat
git diff --cached --check
git commit -m "Agrega politica de privacidad y despliegue verificado"
if ($LASTEXITCODE -ne 0) { throw "No se pudo crear el commit" }
git push
if ($LASTEXITCODE -ne 0) { throw "No se pudo subir a GitHub; no continuar con el VPS" }
```

`git push` utiliza el remoto y la rama ya configurados; no se inventa un repositorio ni se fuerza main. Si no hay upstream, revisar `git remote -v` y `git branch -vv` y configurar la rama correcta. El VPS debe seguir esa misma rama.

## VPS: respaldo del código, actualización y publicación

Ejecutar como usuario `marin-propiedades`, usando la versión Node compatible con el lockfile (validado con Node 24). Requiere git, npm, node, rsync, curl, flock y tar. El repositorio debe estar limpio; no se borran cambios locales automáticamente.

```bash
(
  set -Eeuo pipefail
  cd /home/marin-propiedades/marin-property-elegance-source
  test -z "$(git status --porcelain)" || { echo 'Hay cambios locales; revisarlos antes de actualizar'; exit 1; }
  git branch --show-current
  git remote -v
  respaldo_codigo="/home/marin-propiedades/backups/codigo-previo-$(date +%Y%m%d-%H%M%S)-$$"
  mkdir -p "$respaldo_codigo"
  git rev-parse HEAD > "$respaldo_codigo/commit.txt"
  git archive HEAD > "$respaldo_codigo/codigo.tar"
  git pull --ff-only
  bash deploy/publicar-privacidad.sh
)
```

El script construye el commit en un directorio temporal con `npm ci` y `npm run build`. Solo después de un build correcto respalda toda la carpeta publicada, copia primero los assets y publica index.html al final. Conserva assets anteriores para pestañas abiertas. Compara archivos locales y públicos, sitemap, página de inicio y JS/CSS. Rechaza una cabecera X-Robots-Tag con noindex. Ante errores después de copiar, restaura automáticamente los archivos de la publicación anterior. No revierte commits ni purga caché CDN automáticamente.

El prebuild de sitemap sigue abortando si falla la API: no se reemplaza silenciosamente el sitemap válido por uno incompleto. Si hay caché CDN o transformación HTML, una comparación puede fallar y provocar restauración: revisar/purgar esa caché y volver a ejecutar el script. No desactivar las verificaciones para ocultar el problema.

## Nginx y comprobación pública

El build incluye `politica-de-privacidad/index.html` y `politica-de-privacidad.html`. Si Nginx ya sirve archivos/directorios con `try_files $uri $uri/ /index.html`, el directorio físico permite la carga directa (puede redirigir a la barra final).

Si se recibe el HTML genérico de inicio o un 404, agregar dentro del bloque server existente (no reemplazar el vhost completo):

```nginx
location = /politica-de-privacidad {
    try_files /politica-de-privacidad.html =404;
}
location = /politica-de-privacidad/ {
    return 301 /politica-de-privacidad;
}
location = /politica-de-privacidad.html {
    return 301 /politica-de-privacidad;
}
```

La location exacta principal sirve el archivo internamente con try_files; no redirige a la location de la extensión. Mantener el root existente. Respaldar la configuración antes de editar, ejecutar `sudo nginx -t` y solo si pasa ejecutar `sudo systemctl reload nginx`. Volver a correr el despliegue.

Después de `PUBLICACIÓN VERIFICADA`, abrir la URL en incógnito, recargarla y comprobarla a 360, 390, 768 y 1440 px: sin desplazamiento horizontal, menú móvil utilizable, índice y contacto accesibles por teclado, título correcto y enlace desde el Footer. Abrir también sin JavaScript: el contenido debe seguir disponible. Estas comprobaciones visuales en navegador real siguen pendientes: en el entorno de preparación no se pudo instalar Chromium.

## Restauración manual de una publicación

Usar el directorio exacto de respaldo informado por el script. Revisarlo antes de ejecutar, ya que rsync --delete hace coincidir la publicación con ese respaldo:

```bash
respaldo='/home/marin-propiedades/backups/REEMPLAZAR-POR-RESPALDO-REAL'
test -s "$respaldo/publicacion/index.html" && 
rsync -a --delete "$respaldo/publicacion/" /home/marin-propiedades/htdocs/marinpropiedades.com.ar/
```

Luego verificar el sitio y purgar la caché CDN si corresponde. El código queda en el nuevo commit; para revertirlo usar un commit de reversión revisado, sin reset destructivo.

## Mensaje de WhatsApp — usar solo después de publicar y verificar

Hola, ¿cómo estás? Ya está disponible la Política de Privacidad de Marín Propiedades en la web:
https://marinpropiedades.com.ar/politica-de-privacidad

También agregamos el enlace al pie de la página. Podés usar esta URL en los formularios de clientes potenciales de Facebook e Instagram.

## Validación de esta entrega

Consultar VALIDACION.md para los resultados ejecutados. No se realizó conexión SSH, push a GitHub ni publicación en el VPS desde este entorno. La accesibilidad pública del dominio tras el cambio se verifica durante el despliegue; un build local no acredita publicación.
