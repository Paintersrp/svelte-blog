<script lang="ts">
  import '../app.css';

  import { theme } from '$stores/theme';
  import Navbar from '$comp/navbar/Navbar.svelte';
  import Footer from '$comp/Footer.svelte';

  export let data;

  let currentTheme = $theme;
  let pathname = data.pathname || '';

  const updateTheme = () => {
    const root = document.documentElement;

    Object.keys(currentTheme).forEach((key) => {
      root.style.setProperty(`--${key}`, currentTheme[key as keyof typeof currentTheme]);
    });
  };

  $: {
    currentTheme = $theme;
    pathname = data.pathname;

    if (typeof window !== 'undefined') {
      updateTheme();
    }
  }
</script>

<Navbar />

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
    background-color: var(--background);
    color: var(--textPrimary);
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
    padding-top: 4rem;
  }
</style>
