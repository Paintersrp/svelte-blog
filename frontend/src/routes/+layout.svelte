<script lang="ts">
  import '../app.css';
  import { afterNavigate, beforeNavigate, disableScrollHandling, goto } from '$app/navigation';

  import { toastStore } from '$lib/stores';
  import { ToastContainer } from '$comp/layout';

  export let data;

  beforeNavigate(() => {
    toastStore.clearAll();
  });

  afterNavigate(() => {
    disableScrollHandling();
    setTimeout(() => {
      scrollTo({ top: 0, behavior: 'instant' });
    }, 400);
  });

  $: if (data.logout) {
    goto('/').then(() =>
      setTimeout(() => toastStore.addToast('Logout Successful!', 'success', 'top-right', 5000), 400)
    );
  }
</script>

<main class="dark:bg-dark-50 bg-lime-200">
  <ToastContainer />
  <slot />
</main>

<style>
  :root {
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    font-size: var(--fontSizeBase);
    line-height: var(--line-height-base);
  }

  :global(main) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* background-color: hsl(82 80% 96% / 1); */
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
</style>
