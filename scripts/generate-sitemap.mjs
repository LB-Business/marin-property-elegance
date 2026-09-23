import { mkdir, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, process.argv[2] || 'public');
const origin = 'https://marinpropiedades.com.ar';
const endpoint = 'https://api.lbcodeworks.com.ar/api/public/businesses/marin-propiedades/properties';
const escapeXml = (value) => String(value).replace(/[<>&"']/g, (char) => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[char]));

// Abort on API errors: never overwrite a valid sitemap with an incomplete one.
const response = await fetch(endpoint, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error(`API de propiedades: HTTP ${response.status}`);
const data = await response.json();
const properties = Array.isArray(data.products) ? data.products : data.properties;
if (!Array.isArray(properties)) throw new Error('La API no devolvió una lista de propiedades.');
const entries = new Map([['/', null], ['/propiedades', null]]);
for (const property of properties) {
  if (property.status !== 'published' && property.isPublished !== true) continue;
  const id = property._id || property.id || property.slug;
  if (!id) continue;
  const date = property.updatedAt ? new Date(property.updatedAt) : null;
  entries.set(`/propiedades/${encodeURIComponent(id)}`, date && Number.isFinite(date.getTime()) && date <= new Date() ? date.toISOString() : null);
}
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + [...entries].map(([url, date]) => `  <url><loc>${escapeXml(origin + url)}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}</url>`).join('\n') + '\n</urlset>\n';
await mkdir(output, { recursive: true });
await writeFile(path.join(output, 'sitemap.xml.tmp'), xml, 'utf8');
await rename(path.join(output, 'sitemap.xml.tmp'), path.join(output, 'sitemap.xml'));
await writeFile(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, 'utf8');
console.log(`Sitemap generado: ${entries.size} URLs en ${output}`);
