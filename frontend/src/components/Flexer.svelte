<script lang="ts">
  export let fd = 'row';
  export let ai = 'center';
  export let jc = 'center';
  export let gap = '0';
</script>

<div
  class={$$restProps.class || ''}
  style="
      width: 100%;
      display: flex;
      flex-direction: {fd};
      align-items: {ai};
      justify-content: {jc};
      gap: {gap};
    "
>
  <slot />
</div>
