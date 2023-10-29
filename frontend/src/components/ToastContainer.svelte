<script lang="ts">
  import { flip } from 'svelte/animate';
  import { page } from '$app/stores';
  import Toast from './Toast.svelte';
  import { toastStore } from '$lib/stores/toast';
  import { navbarVisible } from '$lib/stores/navbar';
  import { userMenuVisible } from '$lib/stores/usermenu';

  $: toasts = $toastStore;
  $: marginTop = $navbarVisible
    ? $userMenuVisible
      ? $page.data.user
        ? 'mt-44'
        : 'mt-32'
      : 'mt-16'
    : $userMenuVisible
    ? $page.data.user
      ? 'mt-28'
      : 'mt-20'
    : 'mt-2';
</script>

<div class="toast-container z-50">
  {#each toasts as { id, message, type, position, duration }, index (id)}
    <div
      animate:flip
      class="toast-wrapper {marginTop} duration-400 transition-all"
      style={`position: fixed; ${position.split('-')[0]}: calc(${index} * 3.75rem + 1rem); ${
        position.split('-')[1]
      }: 1rem;`}
    >
      <Toast {message} {type} {duration} on:click={() => toastStore.removeToast(id)} />
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .toast-wrapper {
    position: relative;
  }
</style>
