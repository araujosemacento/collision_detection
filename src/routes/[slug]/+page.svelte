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
	const defaultOgImage = 'https://araujosemacento.github.io/collision_detection/og-cover.jpg';
	let ogImage = $derived.by(() => {
		if (meta.image) {
			if (meta.image.startsWith('http://') || meta.image.startsWith('https://')) {
				return meta.image;
			}
			const cleanPath = meta.image.replace(/^\/+/, '');
			return `https://araujosemacento.github.io/collision_detection/${cleanPath}`;
		}
		return defaultOgImage;
	});

	let isCustomImage = $derived(Boolean(meta.image));
	let imageWidth = $derived(isCustomImage ? 2400 : 1200);
	let imageHeight = $derived(isCustomImage ? 1600 : 630);
	let imageAlt = $derived(
		isCustomImage
			? `Ilustração do capítulo ${meta.title || pageTitle}`
			: 'Capa do livro Detecção de Colisão 2D'
	);

	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'TechArticle',
					'@id': `${pageUrl}#article`,
					isPartOf: {
						'@type': 'Book',
						name: 'Detecção de Colisão 2D',
						url: 'https://araujosemacento.github.io/collision_detection/'
					},
					headline: meta.title || 'Detecção de Colisão 2D',
					description: pageDescription,
					image: ogImage,
					inLanguage: 'pt-BR',
					mainEntityOfPage: pageUrl,
					author: {
						'@type': 'Person',
						name: 'Jeff Thompson',
						url: 'http://www.jeffreythompson.org'
					},
					publisher: {
						'@type': 'Organization',
						name: 'Detecção de Colisão 2D',
						url: 'https://araujosemacento.github.io/collision_detection/'
					}
				},
				{
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							name: 'Início',
							item: 'https://araujosemacento.github.io/collision_detection/'
						},
						{
							'@type': 'ListItem',
							position: 2,
							name: meta.title || 'Capítulo',
							item: pageUrl
						}
					]
				}
			]
		})
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta
		name="keywords"
		content="detecção de colisão 2d, colisão jogos, {meta.title ? `${meta.title.toLowerCase()}, ` : ''}algoritmos de colisão, p5.js, pygame, processing, física 2d, matemática de jogos"
	/>
	<link rel="canonical" href={pageUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Detecção de Colisão 2D" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="{imageWidth}" />
	<meta property="og:image:height" content="{imageHeight}" />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="article:author" content="Jeff Thompson" />
	<meta property="article:section" content="Desenvolvimento de Jogos" />
	<meta property="article:tag" content="Detecção de Colisão, 2D, Jogos, p5.js, Pygame, Processing" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:url" content={pageUrl} />

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
