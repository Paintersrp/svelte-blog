<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { backIn, backOut, linear } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import { betterTweened } from '$lib/animation/betterTweened';

  export let message: string = '';
  export let type: ToastType = 'info';
  export let duration: number = 5000;

  const dispatch = createEventDispatcher();
  const durationProgress = betterTweened(0, { duration, easing: linear });
  let timeoutId: ReturnType<typeof setTimeout>;

  const typeToColor: Record<typeof type, string> = {
    info: 'bg-blue-500',
    success: 'bg-lime-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  const typeToIcon: Record<typeof type, string> = {
    info: 'info',
    success: 'check_circle',
    warning: 'warning',
    error: 'error_outline'
  };

  onMount(() => {
    durationProgress.set(duration);

    timeoutId = setTimeout(() => {
      dispatch('click');
    }, duration);
  });

  function closeToast() {
    clearTimeout(timeoutId);
    dispatch('click');
  }

  function pauseToast() {
    durationProgress.pause();
    clearTimeout(timeoutId);
  }

  function resumeToast() {
    durationProgress.continue();
    timeoutId = setTimeout(() => {
      dispatch('click');
    }, duration - $durationProgress);
  }

  $: bgColor = typeToColor[type];
  $: icon = typeToIcon[type];
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:mouseenter={pauseToast}
  on:mouseleave={resumeToast}
  in:fly|local={{ x: 100, duration: 400, delay: 400, easing: backOut }}
  out:fly|local={{ x: 100, duration: 400, easing: backIn }}
  class={`flex items-center opacity-100 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50 min-w-[225px] whitespace-normal relative`}
>
  <progress
    class="w-full absolute inset-x-0 bottom-0 h-[3px] rounded-b bg-gray-200 transition-all"
    value={$durationProgress}
    max={duration}
  />
  <span class="material-symbols-outlined mr-2 text-xl">
    {icon}
  </span>
  <span class="message font-semibold flex-grow">
    {message}
  </span>
  <button class="ml-auto text-white" on:click={closeToast}>
    <span class="material-symbols-outlined text-xl hover:text-red-800"> close </span>
  </button>
</div>

<style>
  .message {
    font-size: 0.9rem;
  }
  progress {
    appearance: none;
    width: 100%;
  }
</style>
