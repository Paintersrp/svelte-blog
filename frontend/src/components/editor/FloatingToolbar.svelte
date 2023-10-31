<script lang="ts">
  import cx from 'clsx';
  import { createEventDispatcher } from 'svelte';
  import type { Readable } from 'svelte/store';

  import type { Editor } from './utils/Editor';
  import Floating from './Floating.svelte';
  import { handleAction } from './utils/handleAction';

  export let editor: Readable<Editor>;

  let fileInput: HTMLInputElement;

  const dispatch = createEventDispatcher();

  const items = [
    {
      action: 'toggleCode',
      label: '<i class="fas fa-code"></i>',
      isActive: 'code',
      title: 'Code'
    },
    {
      action: () => $editor.chain().focus().toggleHeading({ level: 1 }).run(),
      label: '<b>H1</b>',
      isActive: { name: 'heading', level: 1 },
      title: 'Heading (Level 1)'
    },
    {
      action: () => $editor.chain().focus().toggleHeading({ level: 2 }).run(),
      label: '<b>H2</b>',
      isActive: { name: 'heading', level: 2 },
      title: 'Heading (Level 2)'
    },
    {
      action: 'toggleBlockquote',
      label: '<i class="fas fa-quote-left"></i>',
      isActive: 'blockquote',
      title: 'Blockquote'
    },
    {
      action: 'toggleBulletList',
      label: '<i class="fas fa-list-ul"></i>',
      isActive: 'bulletList',
      title: 'Bullet List'
    },
    {
      action: 'toggleOrderedList',
      label: '<i class="fas fa-list-ol"></i>',
      isActive: 'orderedList',
      title: 'Ordered List'
    },
    {
      action: 'toggleCodeBlock',
      label: '<i class="fas fa-code"></i>',
      isActive: 'codeBlock',
      title: 'Code Block'
    },
    {
      action: 'setHardBreak',
      label: '<i class="fas fa-level-down-alt"></i>',
      title: 'Hardbreak'
    },
    {
      action: 'setHorizontalRule',
      label: '<i class="fas fa-minus"></i>',
      title: 'Horizontal Break'
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
    },
    {
      action: () => imageClick(),
      label: '<i class="fas fa-image"></i>',
      title: 'Image'
    }
  ];

  function handleFileSelection(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    const fileInput = event.target as HTMLInputElement;

    if (file) {
      dispatch('fileSelected', file);
      fileInput.value = '';
    }
  }

  function toggleTextAlignment(alignment: string) {
    $editor.chain().focus().setTextAlign(alignment).run();
  }

  function imageClick() {
    fileInput.click();
  }

  function applyAction(action: string | Function | undefined) {
    handleAction(action, $editor);
  }

  function isHeadingActive(level: number): boolean {
    const { state } = $editor;
    const { selection } = state;
    const { $head } = selection;
    const node = $head.parent;
    return node.type.name === 'heading' && node.attrs.level === level;
  }
</script>

<Floating editor={$editor}>
  <div data-test-id="floating-menu" class="flex w-full">
    <div
      class="floating-toolbar flex w-full p-2 gap-1 flex-wrap bg-white bg-opacity-90 backdrop-blur-md rounded-md shadow-md"
    >
      {#each items as { action, label, isActive, title }}
        <button
          on:click={() => applyAction(action)}
          class="min-w-[20px] h-5 rounded transition-colors ease-in-out duration-300 hover:bg-black hover:text-white
          {isActive &&
          (typeof isActive === 'string'
            ? $editor.isActive(isActive)
            : isActive.level
            ? isHeadingActive(isActive.level)
            : $editor.isActive(isActive))
            ? 'bg-gray-800 text-white'
            : ''}"
          type="button"
          data-title={title}
        >
          {@html label}
        </button>
      {/each}

      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        on:change={handleFileSelection}
        class="hidden"
        bind:this={fileInput}
      />
    </div>
  </div>
</Floating>

<style>
  .backdrop-blur-md {
    backdrop-filter: blur(10px);
  }

  .floating-toolbar button[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    top: 100%;
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
