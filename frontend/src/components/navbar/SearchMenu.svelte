<script lang="ts">
  import { slide } from 'svelte/transition';
  import { sineInOut } from 'svelte/easing';
  import { estimateReadTime } from '$lib/utils/estimateReadTime';
  import { normalizeDate } from '$lib/utils/normalizeDate';

  export let searchResults: App.Post[];
  export let showDropdown: boolean;

  const handleLinkClick = () => {
    showDropdown = false;
    document.body.style.overflow = '';

    console.log(showDropdown);
  };

  $: {
    if (showDropdown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
</script>

<div
  transition:slide={{ duration: 300, easing: sineInOut, axis: 'y' }}
  class="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded shadow-lg overflow-y-auto search-menu"
>
  {#each searchResults as { title, id, User, publishedAt, content, Category, Tags, Comments }, index}
    <a
      href={`/${id}`}
      on:click={handleLinkClick}
      class={`block px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded mb-2 last:mb-0 ${
        index !== searchResults.length - 1 ? 'divider' : ''
      }`}
    >
      <div>
        <div class="font-semibold text-base mb-0.5">{title}</div>
        <div class="text-xs text-gray-500 mb-0.5 flex flex-wrap items-center">
          {User.username} • {normalizeDate(publishedAt)} • {estimateReadTime(content)} • {Comments.length}
          comments •
          {Category.name}
          {#each Tags as { name }}
            <span
              class="inline-block bg-gray-200 rounded-full px-1.5 py-0.5 text-xs font-semibold text-gray-700 mr-1 mt-1"
              >{name}</span
            >
          {/each}
        </div>
      </div>
    </a>
  {/each}
</div>

<style>
  .search-menu {
    max-height: 50rem;
    scrollbar-width: thin;
  }

  .search-menu::-webkit-scrollbar {
    width: 12px;
  }

  .search-menu::-webkit-scrollbar-track {
    background-color: #edf2f7;
  }

  .search-menu::-webkit-scrollbar-thumb {
    background-color: #a0aec0;
    border-radius: 6px;
  }

  .divider {
    border-bottom: 1px solid #e2e8f0;
  }
</style>
