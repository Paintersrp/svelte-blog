<script lang="ts">
  import { fly } from 'svelte/transition';
  import { sineIn, sineOut } from 'svelte/easing';
  import { afterNavigate, beforeNavigate, disableScrollHandling, goto } from '$app/navigation';

  import { toastStore } from '$lib/stores';
  import { Footer, Navbar, ToastContainer } from '$comp/layout';

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
    toastStore.addToast('Login Successful!', 'success', 'top-right', 2000000);
    setTimeout(() => toastStore.addToast('Login Failed!', 'error', 'top-right', 2000000), 500);
    setTimeout(() => toastStore.addToast('Message Received!', 'info', 'top-right', 2000000), 1000);
    setTimeout(
      () => toastStore.addToast('Message Box is Full!', 'warning', 'top-right', 2000000),
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
      in:fly|local={{ x: -100, duration: 400, delay: 500, easing: sineOut }}
      out:fly|local={{ x: 100, duration: 400, easing: sineIn }}
    >
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-20"
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
  main {
    background-color: hsl(82 80% 96% / 1);
    color: var(--textPrimary);
    /* padding-top: 4rem; */
  }
</style>
