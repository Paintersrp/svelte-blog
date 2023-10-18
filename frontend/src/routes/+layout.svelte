<script lang="ts">
  import { onMount } from 'svelte';
  // import { blur } from 'svelte/transition';
  // import { quintOut } from 'svelte/easing';

  import { theme } from '$stores/theme';
  import { categories } from '$stores/categories';
  import { loadCategories } from '$lib/loadCategories';
  import Navbar from '$comp/Navbar.svelte';
  import Footer from '$comp/Footer.svelte';

  export let data;

  let currentTheme = $theme;
  let currentCategories = $categories;
  let pathname = '';

  const updateTheme = () => {
    const root = document.documentElement;

    Object.keys(currentTheme).forEach((key) => {
      root.style.setProperty(`--${key}`, currentTheme[key as keyof typeof currentTheme]);
    });
  };

  onMount(async () => {
    await loadCategories();
  });

  $: {
    currentTheme = $theme;
    currentCategories = $categories;
    pathname = data.pathname;

    if (typeof window !== 'undefined') {
      updateTheme();
    }
  }
</script>

<Navbar />

<!-- {#key pathname}
  <main in:blur={{ delay: 250, amount: 3, duration: 200 }} out:blur={{ amount: 3, duration: 200 }}>
    <slot />
  </main>
{/key} -->

<main>
  <slot />
</main>

<Footer />

<style>
  :root {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: var(--fontSizeBase);
    line-height: var(--line-height-base);
  }

  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(a) {
    color: var(--textPrimary);
  }

  :global(p) {
    margin: 0;
    padding: 0;
  }

  main {
    background-color: var(--background);
    color: var(--textPrimary);
    padding-right: var(--spacingMedium);
  }
</style>
