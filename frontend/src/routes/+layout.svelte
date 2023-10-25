<script lang="ts">
  import '../app.css';
  import { fly } from 'svelte/transition';
  import { backIn, backOut } from 'svelte/easing';
  import { afterNavigate, disableScrollHandling } from '$app/navigation';

  import Navbar from '$comp/navbar/Navbar.svelte';
  import Footer from '$comp/Footer.svelte';

  export let data;

  // afterNavigate(() => {
  // disableScrollHandling();
  // setTimeout(() => {
  //   scrollTo({ top: 0, behavior: 'instant' });
  // }, 400);
  // });

  $: pathname = data.url;
</script>

<Navbar />

<main>
  {#key pathname}
    <div
      in:fly={{ x: -100, duration: 400, delay: 400, easing: backOut }}
      out:fly={{ x: 100, duration: 400, easing: backIn }}
    >
      <slot />
    </div>
  {/key}
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
    background-color: hsl(82 80% 96% / 1);
    color: var(--textPrimary);
    scroll-behavior: smooth;
  }

  :global(a) {
    color: var(--textPrimary);
  }

  :global(p) {
    margin: 0;
    padding: 0;
  }

  main {
    background-color: hsl(82 80% 96% / 1);
    color: var(--textPrimary);
    padding-top: 4rem;
  }
</style>
