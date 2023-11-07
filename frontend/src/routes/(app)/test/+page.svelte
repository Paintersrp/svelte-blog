<script lang="ts">
  import { fade } from 'svelte/transition';
  export let data;

  $: src = data.src;
</script>

<div>
  <img transition:fade {src} class="" alt="pling" />
</div>
