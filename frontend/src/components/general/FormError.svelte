<script lang="ts">
  import { backOut, backIn, sineIn, sineOut } from 'svelte/easing';
  import { fly, fade, slide } from 'svelte/transition';

  export let message: string;
  export let color = 'text-lime-900';
  export let size: 'sm' | 'base' | 'lg' = 'base';
</script>

<p
  in:slide={{ easing: sineIn, duration: 500, delay: 300 }}
  out:slide={{ easing: sineOut, duration: 500 }}
  class={`${color} text-${size} mt-1 pb-2 font-bold`}
>
  {message}
</p>
