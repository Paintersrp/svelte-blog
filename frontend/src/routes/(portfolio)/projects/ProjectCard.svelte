<script lang="ts">
  export let project: App.Project;
  export let cardClass: string = '';
</script>

<div
  class={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-lg rounded-lg overflow-hidden transition-transform ${cardClass}`}
>
  <img src={project.imgUrl} alt={project.title} class="w-full h-48 object-cover" />
  <div class="p-6">
    <h3 class="text-2xl font-bold text-white mb-2">{project.title}</h3>
    <p class="text-gray-300">{project.description}</p>
    <p class="text-gray-400 text-sm mt-4">{project.details}</p>
  </div>
</div>
