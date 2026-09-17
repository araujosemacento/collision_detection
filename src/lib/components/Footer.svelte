<script>
  import { base } from "$app/paths";
  import { getChapterInfo } from "$lib/utils/navigation.js";

  let { slug = "index" } = $props();
  let info = $derived(getChapterInfo(slug));
</script>

{#if info?.next}
  <a href="{base}/{info.next.slug}" class="next-page-link">
    <p class="next-page">PRÓXIMO: {info.next.title.toUpperCase()}</p>
  </a>
{/if}

<footer>
  <p class="mb-0">
    [ <a href="{base}/">Início</a> |
    <a href="{base}/table_of_contents">Sumário</a>
    |
    <a
      href="https://github.com/araujosemacento/collision_detection"
      target="_blank"
      rel="noreferrer">GitHub</a
    > ]
  </p>
  <p class="license">
    <a
      rel="license"
      href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
      target="_blank"
    >
      <img
        id="license-img"
        alt="Licença Creative Commons"
        src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
      />
    </a>
  </p>
  <p class="credits">
    Livro original por <a href="http://www.jeffreythompson.org" target="_blank"
      >Jeff Thompson</a
    >. Traduzido e adaptado para Svelte & p5.js.
  </p>
</footer>

<style>
  .next-page-link {
    text-decoration: none;
  }

  .next-page {
    margin: 3rem 0 2rem 0;
    padding: 1.2rem;
    background: var(--color-primary, #ff9600);
    color: #ffffff;
    font-family: var(--font-heading, "Raleway", sans-serif);
    font-weight: 800;
    font-size: 1.1rem;
    text-align: center;
    border-radius: 6px;
    letter-spacing: 0.05em;
    transition:
      transform 0.15s ease,
      background 0.15s ease;
  }

  .next-page:hover {
    background: #e08400;
    transform: translateY(-2px);
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border, #eee);
    text-align: center;
    font-family: var(--font-heading, "Raleway", sans-serif);
    font-size: 0.9rem;
    color: var(--color-text-muted, #666);
  }

  footer a {
    color: var(--color-primary, #ff9600);
    text-decoration: none;
  }

  footer a:hover {
    text-decoration: underline;
  }

  .license {
    margin: 1rem 0;
  }

  #license-img {
    opacity: 0.85;
    transition: opacity 0.2s;
  }

  #license-img:hover {
    opacity: 1;
  }

  .credits {
    font-size: 0.8rem;
    color: #888;
  }

  .mb-0 {
    margin-bottom: 0;
  }
</style>
