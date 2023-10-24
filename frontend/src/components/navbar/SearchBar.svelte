<script lang="ts">
  import { debounce } from 'lodash';
  import { onMount } from 'svelte';
  import SearchMenu from './SearchMenu.svelte';

  let searchQuery = '';
  let searchResults: App.Post[] = [];

  $: showDropdown = false;

  const debouncedSearch = debounce(async (query) => {
    const response = await fetch(
      `http://localhost:4000/posts?searchColumns=title&search=${query}&includes=User,Comment,Tag,Category`
    ).then((res) => res.json());

    searchResults = response.data.data;
    showDropdown = searchResults.length > 0;
  }, 300);

  const instantSearch = async (query: string) => {
    const response = await fetch(
      `http://localhost:4000/posts?searchColumns=title&search=${query}&includes=User,Comment,Tag,Category`
    ).then((res) => res.json());

    searchResults = response.data.data;
    showDropdown = searchResults.length > 0;
  };

  const handleInput = (event: any) => {
    searchQuery = event.target.value;

    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      showDropdown = false;
    }
  };

  const handleClick = () => {
    if (searchQuery) {
      instantSearch(searchQuery);
    }
  };

  const handleClickAway = (event: any) => {
    if (!event.target.closest('.search-container')) {
      showDropdown = false;
      document.body.style.overflow = '';
    }
  };

  onMount(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClickAway);

      return () => {
        document.removeEventListener('click', handleClickAway);
      };
    }
  });
</script>

<div class="lg:mx-8 md:mx-6 sm:mx-4 mx-3 relative max-w-lg justify-start search-container rounded">
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    on:input={handleInput}
    on:click={handleClick}
    class="w-full p-2 border border-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:rounded transition-all duration-300 rounded"
  />

  <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-lime-900">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      id="search"
      ><path
        d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
      /></svg
    >
  </button>

  {#if showDropdown}
    <SearchMenu bind:searchResults bind:showDropdown />
  {/if}
</div>

<style>
  .search-container {
    width: 100%;
  }
</style>
