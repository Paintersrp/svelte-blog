<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { navbarVisible } from '$stores/navbar';

  export let categories: App.Category[];

  $: activeCategory = 'all';
  const dispatch = createEventDispatcher();

  const selectCategory = (value: string) => {
    activeCategory = value;
    dispatch('categorySelect', value);
  };
</script>

<div
  class={`flex overflow-x-auto py-2 bg-gray-100 border-b border-gray-300 space-x-4 px-4 shadow-lg hide-scrollbar transition-all duration-300 sticky ${
    $navbarVisible ? 'nav-top-padding' : 'top-0'
  } z-0`}
>
  {#each categories as { name }}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class={`category px-4 py-2 font-semibold text-gray-700 rounded-full cursor-pointer transition-all duration-300 shadow-md 
      ${
        activeCategory === name
          ? 'bg-lime-500 text-black transform'
          : 'hover:bg-lime-500 hover:text-white'
      }`}
      on:click={() => selectCategory(name)}
    >
      {name}
    </div>
  {/each}
</div>

<style>
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .nav-top-padding {
    top: 4.4rem;
  }
</style>
