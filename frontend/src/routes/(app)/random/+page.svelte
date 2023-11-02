<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { sineIn, sineOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  export let messages: string[] = ['Hello', 'Bonjour', 'Konnichiwa'];
  export let className: string = '';

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

{#key index}
  <h1
    class={className}
    in:slide={{ duration: 400, delay: 400, easing: sineOut }}
    out:slide={{ duration: 400, easing: sineIn }}
  >
    {messages[index]}!
  </h1>
{/key}
