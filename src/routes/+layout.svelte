<script>
	import '../app.css';
	import 'katex/dist/katex.min.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<meta name="theme-color" content="#ff9600" />
	<meta name="apple-mobile-web-app-title" content="Detecção de Colisão 2D" />
	<title>Detecção de Colisão 2D</title>
</svelte:head>

<div id="wrapper">
	{@render children()}
</div>
