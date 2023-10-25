<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { navbarVisible } from '$stores/navbar';

  export let categories: App.Category[];

  let allCategories = [{ id: 'All', name: 'All' }, ...categories];
  let activeCategories: (number | string)[] = ['All'];

  const dispatch = createEventDispatcher();

  const selectCategory = (value: number | string) => {
    if (value === 'All') {
      activeCategories = ['All'];
    } else {
      if (activeCategories.includes('All')) {
        activeCategories = activeCategories.filter((category) => category !== 'All');
      }

      activeCategories = activeCategories.includes(value)
        ? activeCategories.filter((category) => category !== value)
        : [value];
    }

    dispatch('categorySelect', activeCategories);

    if (activeCategories.length < 1) {
      activeCategories = ['All'];
    }
  };
</script>

<div
  class={`flex overflow-x-auto py-2 bg-lime-100 border-b border-gray-300 space-x-4 px-4 shadow-lg hide-scrollbar transition-all duration-300 sticky ${
    $navbarVisible ? 'nav-top-padding' : 'top-0'
  } z-0`}
>
  {#each allCategories as category (category.id)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class={`category px-4 py-2 font-semibold text-gray-700 rounded-full cursor-pointer transition-all duration-300 shadow-md bg-lime-200
      ${
        activeCategories.includes(category.id)
          ? 'bg-lime-500 text-white'
          : 'hover:bg-lime-500 hover:text-white'
      }`}
      on:click={() => selectCategory(category.id)}
    >
      {category.name}
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
