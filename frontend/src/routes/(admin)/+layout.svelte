<script>
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';
  export let data;

  const isSidebarOpen = writable(true);

  function toggleSidebar() {
    isSidebarOpen.update((value) => !value);
  }

  $: width = $isSidebarOpen ? 'w-64' : 'w-20';
</script>

<div class="flex h-screen bg-gray-100 overflow-hidden">
  <!-- Sidebar -->
  <div
    class={`flex flex-col bg-gray-800 p-4 transition-all duration-300 ease-in-out ${
      $isSidebarOpen ? 'w-64' : 'w-20'
    }`}
  >
    <button class="text-white mb-4" on:click={toggleSidebar}>
      <span class="material-icons">
        {$isSidebarOpen ? 'chevron_left' : 'chevron_right'}
      </span>
    </button>
    <nav>
      <ul class="space-y-4">
        <li>
          <a href="/admin" class="flex items-center text-white">
            <span class="material-icons">dashboard</span>
            {#if $isSidebarOpen}<span class="ml-2">Dashboard</span>{/if}
          </a>
        </li>
        <!-- ... other nav links ... -->
      </ul>
    </nav>
    {#if $isSidebarOpen}
      <footer class="absolute bottom-4 text-white text-sm">
        <!-- Footer Content -->
      </footer>
    {/if}
  </div>

  <!-- Main Content -->
  <div class="flex-grow p-4 overflow-auto">
    <header class="flex justify-between items-center mb-4">
      <input type="search" placeholder="Search" class="p-2 rounded border" />
      <!-- Notifications and User Account Menu -->
    </header>
    <main>
      <slot />
    </main>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
