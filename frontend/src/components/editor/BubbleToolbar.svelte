<script lang="ts">
  import type { Readable } from 'svelte/store';

  import type { Editor } from './utils/Editor';
  import { handleAction } from './utils/handleAction';
  import Bubble from './Bubble.svelte';

  export let editor: Readable<Editor>;

  const items = [
    {
      action: 'toggleBold',
      label: '<i class="fas fa-bold" />',
      isActive: 'bold',
      title: 'Bold'
    },
    {
      action: 'toggleItalic',
      label: '<i class="fas fa-italic" />',
      isActive: 'italic',
      title: 'Italic'
    },
    {
      action: 'toggleStrike',
      label: '<i class="fas fa-strikethrough" />',
      isActive: 'strike',
      title: 'Strikethrough'
    },
    {
      action: 'toggleUnderline',
      label: '<i class="fas fa-underline" />',
      isActive: 'underline',
      title: 'Underline'
    },
    {
      action: () => toggleTextAlignment('left'),
      label: '<i class="fas fa-align-left" />',
      isActive: { textAlign: 'left' },
      title: 'Align Left'
    },
    {
      action: () => toggleTextAlignment('center'),
      label: '<i class="fas fa-align-center" />',
      isActive: { textAlign: 'center' },
      title: 'Align Center'
    },
    {
      action: () => toggleTextAlignment('right'),
      label: '<i class="fas fa-align-right" />',
      isActive: { textAlign: 'right' },
      title: 'Align Right'
    }
  ];

  function toggleTextAlignment(alignment: string) {
    $editor.chain().focus().setTextAlign(alignment).run();
  }

  function applyAction(action: string | Function | undefined) {
    handleAction(action, $editor);
  }
</script>

<Bubble editor={$editor}>
  <div
    data-test-id="bubble-menu"
    class="flex w-full p-2 gap-1 flex-wrap bg-white bg-opacity-90 backdrop-blur-md rounded-md shadow-md"
  >
    {#each items as { action, label, isActive, title }}
      <button
        on:click={() => applyAction(action)}
        class="min-w-[20px] h-5 rounded transition-colors ease-in-out duration-300 hover:bg-black hover:text-white
          {$editor.isActive(isActive) ? 'bg-gray-800 text-white' : ''}"
        type="button"
        data-title={title}
      >
        {@html label}
      </button>
    {/each}
  </div>
</Bubble>

<style>
  button[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 6px;
    border-radius: 6px;
    white-space: nowrap;
    margin-top: 10px;
    z-index: 1;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
</style>
