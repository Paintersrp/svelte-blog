<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { sineIn, sineOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  export let messages: string[] = ['Hello', 'Bonjour', 'Konnichiwa'];
  export let containerClass: string = '';
  export let textClass: string = '';

  let index = 0;
  let roller: NodeJS.Timeout;
  let height: string | null = null;

  onMount(() => {
    roller = setInterval(() => {
      if (index === messages.length - 1) index = 0;
      else index++;
      updateHeight();
    }, 2000);

    updateHeight();
  });

  onDestroy(() => {
    clearInterval(roller);
  });

  async function updateHeight() {
    await tick();
    const el = document.querySelector('.container h1');
    if (el instanceof HTMLElement) {
      height = `${el.offsetHeight}px`;
    }
  }
</script>

<div class={`container ${containerClass}`} style={`height: ${height}`}>
  {#key index}
    <h1
      class={textClass}
      in:slide={{ duration: 400, delay: 400, easing: sineOut }}
      out:slide={{ duration: 400, easing: sineIn }}
    >
      {messages[index]}
    </h1>
  {/key}
</div>

<style>
</style>
