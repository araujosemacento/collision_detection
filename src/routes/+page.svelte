<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CanvasSketch from '$lib/components/CanvasSketch.svelte';

	let { data } = $props();

	let Content = $derived(data.content);
	let meta = $derived(data.meta || {});

	let pageTitle = 'Detecção de Colisão 2D - Algoritmos Interativos em p5.js e Pygame';
	let pageDescription =
		'Livro interativo sobre algoritmos de detecção de colisão 2D em jogos. Explicações visuais passo a passo em p5.js e código em JavaScript, Pygame (Python) e Processing (Java).';
	let pageUrl = 'https://araujosemacento.github.io/collision_detection/';
	let ogImage = 'https://araujosemacento.github.io/collision_detection/og-cover.jpg';

	let jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Book',
		name: 'Detecção de Colisão 2D',
		headline: pageTitle,
		description: pageDescription,
		image: ogImage,
		inLanguage: 'pt-BR',
		url: pageUrl,
		author: {
			'@type': 'Person',
			name: 'Jeff Thompson',
			url: 'http://www.jeffreythompson.org'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Detecção de Colisão 2D',
			url: pageUrl
		},
		sameAs: ['https://github.com/araujosemacento/collision_detection']
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta
		name="keywords"
		content="detecção de colisão 2d, colisão jogos, desenvolvimento de jogos, p5.js, pygame, processsing, física 2d, matemática de jogos, algoritmos de colisão"
	/>
	<link rel="canonical" href={pageUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Detecção de Colisão 2D" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Capa do livro Detecção de Colisão 2D" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:url" content={pageUrl} />

	<!-- Structured Data (JSON-LD) -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<Header slug="index" />

{#if meta.sketch}
	<CanvasSketch sketchName={meta.sketch} caption={meta.caption || ''} />
{/if}

<main class="chapter-body">
	<Content />
</main>

<Footer slug="index" />

<style>
	.chapter-body {
		margin-top: 1rem;
	}
</style>
