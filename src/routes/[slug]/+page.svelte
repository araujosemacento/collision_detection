<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CanvasSketch from '$lib/components/CanvasSketch.svelte';

	let { data } = $props();

	let Content = $derived(data.content);
	let meta = $derived(data.meta || {});
	let slug = $derived(meta.slug || 'index');

	let pageTitle = $derived(meta.title ? `${meta.title} - Detecção de Colisão 2D` : 'Detecção de Colisão 2D');
	let pageDescription = $derived(
		meta.description ||
			meta.caption ||
			`Aprenda o algoritmo de detecção de colisão 2D para ${meta.title || 'jogos'} com explicações passo a passo e demonstração interativa p5.js.`
	);
	let pageUrl = $derived(
		`https://araujosemacento.github.io/collision_detection${slug === 'index' ? '/' : `/${slug}`}`
	);
	let ogImage = 'https://araujosemacento.github.io/collision_detection/og-cover.jpg';

	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'TechArticle',
			headline: meta.title || 'Detecção de Colisão 2D',
			description: pageDescription,
			inLanguage: 'pt-BR',
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': pageUrl
			},
			author: {
				'@type': 'Person',
				name: 'Jeff Thompson'
			},
			publisher: {
				'@type': 'Organization',
				name: 'Detecção de Colisão 2D'
			}
		})
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={pageUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Detecção de Colisão 2D" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={ogImage} />

	<!-- Structured Data (JSON-LD) -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

{#key slug}
	<Header {slug} />

	{#if meta.sketch}
		<CanvasSketch sketchName={meta.sketch} />
	{/if}

	<main class="chapter-body">
		<Content />
	</main>

	<Footer {slug} />
{/key}

<style>
	.chapter-body {
		margin-top: 1rem;
	}
</style>
