import { chapters } from '$lib/utils/navigation.js';

export const prerender = true;

export async function GET() {
	const siteUrl = 'https://araujosemacento.github.io/collision_detection';

	const today = new Date().toISOString().split('T')[0];

	const urlNodes = chapters.map((c) => {
		const pagePath = c.slug === 'index' ? '' : c.slug;
		const priority = c.slug === 'index' ? '1.0' : '0.8';
		return `  <url>
    <loc>${siteUrl}/${pagePath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
	});

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes.join('\n')}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
