<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { sineIn, sineOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  export let messages: string[] = ['Hello', 'Bonjour', 'Konnichiwa'];
  export let containerClass: string = '';
  export let textClass: string = '';

  let index = 0;
  let roller: NodeJS.Timeout;

  onMount(() => {
    roller = setInterval(() => {
      if (index === messages.length - 1) index = 0;
      else index++;
    }, 1250);
  });

  onDestroy(() => {
    clearInterval(roller);
  });
</script>

<div class={`container ${containerClass}`}>
  {#key index}
    <h1
      class={textClass}
      in:fly={{ x: -100, duration: 400, delay: 400, easing: sineOut }}
      out:fly={{ x: 100, duration: 400, easing: sineIn }}
    >
      {messages[index]}
    </h1>
  {/key}
</div>

<style>
  .container {
    height: 2em;
    overflow: hidden;
  }
</style>
