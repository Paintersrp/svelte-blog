<script lang="ts">
  import { fly } from 'svelte/transition';
  import { sineIn, sineOut } from 'svelte/easing';

  import { toastStore } from '$lib/stores';
  import { Footer, Navbar } from '$comp/layout';

  export let data;

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
</script>

<Navbar />

{#key pathname}
  <div
    in:fly|local={{ x: -100, duration: 400, delay: 500, easing: sineOut }}
    out:fly|local={{ x: 100, duration: 400, easing: sineIn }}
    class="padding-top"
  >
    <!-- <button
      class="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-20"
      on:click={showToast}
    >
      Test Toast Button
    </button> -->

    <slot />
  </div>
{/key}


<Footer />

<style>
  .padding-top {
    padding-top: 64px;
  }
</style>
