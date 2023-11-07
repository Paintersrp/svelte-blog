<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<div
  class="flex-grow flex justify-center"
  in:fly={{ y: 500, duration: 500, delay: 700 }}
  out:fly={{ y: 500, duration: 500 }}
>
  <main class="flex-grow flex flex-col items-center justify-center p-4 md:p-12 space-y-6 max-w-5xl">
    <h1 class="text-5xl md:text-6xl font-bold text-white text-center leading-tight mb-4">Third</h1>
    <p class="text-xl text-white text-center">Page (3)</p>
  </main>
</div>
