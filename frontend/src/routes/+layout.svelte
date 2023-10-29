<script lang="ts">
  import '../app.css';
  import { fly } from 'svelte/transition';
  import { backIn, backOut } from 'svelte/easing';
  import { afterNavigate, beforeNavigate, disableScrollHandling, goto } from '$app/navigation';

  import Navbar from '$comp/navbar/Navbar.svelte';
  import Footer from '$comp/Footer.svelte';
  import { toastStore } from '$lib/stores/toast';
  import ToastContainer from '$comp/ToastContainer.svelte';

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

  function showToast() {
    toastStore.addToast('Login Successful!', 'success', 'top-right', 5000);
    setTimeout(() => toastStore.addToast('Login Failed!', 'error', 'top-right', 5000), 500);
    setTimeout(() => toastStore.addToast('Message Received!', 'info', 'top-right', 5000), 1000);
    setTimeout(
      () => toastStore.addToast('Message Box is Full!', 'warning', 'top-right', 5000),
      1500
    );
  }

  $: pathname = data.url;
  $: if (data.logout) {
    goto('/').then(() =>
      setTimeout(() => toastStore.addToast('Logout Successful!', 'success', 'top-right', 5000), 400)
    );
  }
</script>

<Navbar />

<main>
  {#key pathname}
    <div
      in:fly|local={{ x: -100, duration: 400, delay: 400, easing: backOut }}
      out:fly|local={{ x: 100, duration: 400, easing: backIn }}
    >
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        on:click={showToast}
      >
        Test Toast Button
      </button>
      <ToastContainer />

      <slot />
    </div>
  {/key}
</main>

<Footer />

<style>
  :root {
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    font-size: var(--fontSizeBase);
    line-height: var(--line-height-base);
  }

  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* background-color: hsl(82 80% 96% / 1); */
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
