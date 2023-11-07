<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import type { EasingFunction, TransitionConfig } from 'svelte/transition';

  type ModalParams = { duration?: number; easing?: EasingFunction };
  type Modal = (node: Element, params?: ModalParams) => TransitionConfig;

  const modal: Modal = (node, { duration = 300, easing = cubicIn } = {}) => {
    const transform = getComputedStyle(node).transform;

    return {
      duration,
      easing,
      css: (t, u) => {
        return `transform:
            ${transform}
            scale(${t})
            translateY(${u * -100}%)
          `;
      }
    };
  };

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-background" on:click={closeModal} />

<div
  in:modal={{ duration: 500, easing: cubicIn }}
  out:modal={{ duration: 500, easing: cubicOut }}
  class="modal"
  role="dialog"
  aria-modal="true"
>
  <slot />
</div>

<style lang="scss">
  .modal-background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: hsla(0 0% 0% / 20%);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    background: hsl(220 20% 90%);
    box-shadow: 0 0 10px hsl(0 0% 0% / 10%);
    transform: translate(-50%, -50%);
    border-radius: 1rem;
  }
</style>
