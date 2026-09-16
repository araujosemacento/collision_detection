<script>
	import katex from 'katex';

	let { expr = '', display = false, class: className = '' } = $props();

	let html = $derived.by(() => {
		try {
			return katex.renderToString(expr, {
				displayMode: display,
				throwOnError: false,
				output: 'htmlAndMathml'
			});
		} catch (err) {
			console.error('Erro de renderização do KaTeX:', err);
			return expr;
		}
	});
</script>

{#if display}
	<div class="math-block {className}">
		{@html html}
	</div>
{:else}
	<span class="math-inline {className}">
		{@html html}
	</span>
{/if}

<style>
	.math-block {
		margin: 1.25rem 0;
		padding: 0.5rem 0;
		overflow-x: auto;
		overflow-y: hidden;
		text-align: center;
	}

	.math-inline {
		display: inline-block;
		vertical-align: middle;
	}
</style>
