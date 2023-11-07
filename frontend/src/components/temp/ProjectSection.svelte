<script lang="ts">
  import { slide } from 'svelte/transition';
  import Modal from './Modal.svelte';

  let showModal = false;

  const open = () => (showModal = true);
  const close = () => (showModal = false);
</script>

<button
  transition:slide
  class="fixed top-1/2 left-0 bg-opacity-20 bg-black text-white p-4 shadow-lg cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out rounded-b-lg flex flex-col items-center space-y-4"
  on:click={open}
  style="transform: translateY(-50%) rotate(-90deg) translateX(-50%); transform-origin: left top;"
>
  <span class="whitespace-nowrap">PROJECTS</span>
</button>

{#if showModal}
  <Modal on:close={close}>
    <img src="https://i.giphy.com/media/Ju7l5y9osyymQ/giphy.webp" alt="Man is dancing" />
  </Modal>
{/if}

<style lang="scss">
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
