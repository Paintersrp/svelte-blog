<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { backIn, backOut, elasticIn, elasticOut } from 'svelte/easing';

  export let projects: App.Project[];
  export let onClose: () => void;

  let selectedProjectIndex = 0;
  let modalElement: HTMLElement;

  $: selectedProject = projects[selectedProjectIndex];

  function selectProject(index: number) {
    selectedProjectIndex = index;
  }

  function navigateProject(direction: 1 | -1) {
    selectedProjectIndex = (projects.length + selectedProjectIndex + direction) % projects.length;
  }
</script>

<div
  class="flex justify-center items-center fixed inset-0 z-50"
  on:click={onClose}
  in:fly={{ x: -200, duration: 300, easing: backOut }}
  out:fly={{ x: -200, duration: 300, easing: backIn }}
>
  <div bind:this={modalElement} class="fixed bg-white p-8" on:click|stopPropagation>
    <div class="flex flex-col h-full">
      <!-- Project Details -->
      <div class="flex-grow overflow-auto">
        <h3 class="text-xl font-bold">{selectedProject.title}</h3>
        <p>{selectedProject.description}</p>
        <p class="text-sm text-gray-600">{selectedProject.details}</p>
      </div>

      <!-- Project Selector -->
      <div class="overflow-x-auto whitespace-nowrap py-4 border-t">
        {#each projects as project, index}
          <button
            class="inline-block border p-2 rounded mr-2 hover:bg-gray-200 transition"
            on:click={() => selectProject(index)}
          >
            {project.title}
          </button>
        {/each}
      </div>

      <!-- Navigation -->
      <div class="flex justify-between items-center pt-4">
        <button
          class="border p-2 rounded hover:bg-gray-200 transition"
          on:click={() => navigateProject(-1)}
        >
          Previous
        </button>
        <button class="border p-2 rounded hover:bg-gray-200 transition" on:click={onClose}>
          Close
        </button>
        <button
          class="border p-2 rounded hover:bg-gray-200 transition"
          on:click={() => navigateProject(1)}
        >
          Next
        </button>
      </div>
    </div>
  </div>
</div>
