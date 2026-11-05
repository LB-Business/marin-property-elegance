import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Render the same React component used by the route. No duplicated legal text.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { PrivacyPage } = await server.ssrLoadModule('/src/components/PrivacyPage.tsx');
  const policy = JSON.parse(await readFile('src/content/privacy.json', 'utf8'));
  const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  let html = await readFile('dist/index.html', 'utf8');
  html = html.replace(/<title>[\s\S]*?<\/title>/, '').replace(/<meta\s+name="description"[\s\S]*?\/>/, '');
  const meta = [
    `<title data-prerender>${escape(policy.title)}</title>`,
    `<meta data-prerender name="description" content="${escape(policy.description)}">`,
    `<meta data-prerender name="robots" content="index, follow">`,
    `<link data-prerender rel="canonical" href="${policy.url}">`,
    ...[['og:title',policy.title],['og:description',policy.description],['og:url',policy.url],['og:type','website'],['og:locale','es_AR']].map(([key,value]) => `<meta data-prerender property="${key}" content="${escape(value)}">`),
    `<meta data-prerender name="twitter:card" content="summary">`,
    `<link data-prerender rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&amp;display=swap">`,
    '<noscript><style>header{opacity:1!important;transform:none!important}</style></noscript>',
  ].join('\n');
  html = html.replace('</head>', `${meta}\n</head>`).replace('<div id="root"></div>', `<div id="root">${renderToStaticMarkup(React.createElement(PrivacyPage))}</div>`);
  await mkdir('dist/politica-de-privacidad', { recursive: true });
  await writeFile('dist/politica-de-privacidad/index.html', html);
  await writeFile('dist/politica-de-privacidad.html', html);
  console.log('Política prerenderizada: HTML público con contenido y SEO.');
} finally { await server.close(); }
