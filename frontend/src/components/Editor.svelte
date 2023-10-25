<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';

  export let content: string = '<p>Hello World</p>';

  let editor: Editor | undefined;
  let element: HTMLElement;
  const dispatch = createEventDispatcher();

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit],
      content: content,
      onUpdate: ({ editor }) => {
        const newContent = editor.getHTML();
        if (newContent !== content) {
          content = newContent;
          dispatch('contentUpdate', content);
        }
      }
    });
  });

  $: if (editor && content !== editor.getHTML()) {
    editor.commands.setContent(content);
  }

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  const items = [
    {
      action: 'toggleBold',
      label: '<i class="fas fa-bold"></i>',
      isActive: 'bold',
      title: 'Bold'
    },
    {
      action: 'toggleItalic',
      label: '<i class="fas fa-italic"></i>',
      isActive: 'italic',
      title: 'Italic'
    },
    {
      action: 'toggleStrike',
      label: '<i class="fas fa-strikethrough"></i>',
      isActive: 'strike',
      title: 'Strikethrough'
    },
    {
      action: 'toggleCode',
      label: '<i class="fas fa-code"></i>',
      isActive: 'code',
      title: 'Code'
    },
    {
      action: 'setParagraph',
      label: '<i class="fas fa-solid fa-paragraph"></i>',
      isActive: 'paragraph',
      title: 'Paragraph'
    },
    {
      action: () => editor!.chain().focus().toggleHeading({ level: 1 }).run(),
      label: '<b>H1</b>',
      isActive: { name: 'heading', level: 1 },
      title: 'Heading (Level 1)'
    },
    {
      action: () => editor!.chain().focus().toggleHeading({ level: 2 }).run(),
      label: '<b>H2</b>',
      isActive: { name: 'heading', level: 2 },
      title: 'Heading (Level 2)'
    },
    {
      action: () => editor!.chain().focus().toggleHeading({ level: 3 }).run(),
      label: '<b>H3</b>',
      isActive: { name: 'heading', level: 3 },
      title: 'Heading (Level 3)'
    },
    {
      action: () => editor!.chain().focus().toggleHeading({ level: 4 }).run(),
      label: '<b>H4</b>',
      isActive: { name: 'heading', level: 4 },
      title: 'Heading (Level 4)'
    },
    {
      action: () => editor!.chain().focus().toggleHeading({ level: 5 }).run(),
      label: '<b>H5</b>',
      isActive: { name: 'heading', level: 5 },
      title: 'Heading (Level 5)'
    },
    {
      action: () => editor!.chain().focus().toggleHeading({ level: 6 }).run(),
      label: '<b>H6</b>',
      isActive: { name: 'heading', level: 6 },
      title: 'Heading (Level 6)'
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
    }
  ];

  const historyItems = [
    {
      action: () => editor!.chain().undo().run(),
      label: '<i class="fas fa-undo"></i>',
      title: 'Undo'
    },
    {
      action: () => editor!.chain().redo().run(),
      label: '<i class="fas fa-redo"></i>',
      title: 'Redo'
    }
  ];

  function handleAction(action: string | Function | undefined) {
    if (action === undefined) {
      console.error('Action is undefined');
      return;
    }

    if (typeof action === 'function') {
      action();
    } else {
      const command = (editor!.chain().focus() as any)[action];

      if (command) {
        command().run();
      } else {
        console.error(`Unknown action: ${action}`);
      }
    }
  }

  function isHeadingActive(level: number): boolean {
    const { state } = editor!;
    const { selection } = state;
    const { $head } = selection;
    const node = $head.parent;
    return node.type.name === 'heading' && node.attrs.level === level;
  }
</script>

{#if editor}
  <div class="toolbar">
    <div>
      {#each items as { action, label, isActive, title }, index}
        <button
          on:click={() => handleAction(action)}
          class:active={isActive &&
            (typeof isActive === 'string'
              ? editor.isActive(isActive)
              : isHeadingActive(isActive.level))}
          data-title={title}
        >
          {@html label}
        </button>
      {/each}
    </div>
    <div class="undo-redo-section">
      {#each historyItems as { action, label, title }}
        <button on:click={() => handleAction(action)} data-title={title}>
          {@html label}
        </button>
      {/each}
    </div>
  </div>
{/if}

<div class="editor" bind:this={element} />

<style>
  .toolbar {
    display: flex;
    flex-direction: column;
    background: var(--backgroundSidebar);
    padding: 10px;
    border: 1px solid #cccccc50;
    gap: 5px;
  }

  .toolbar > * {
    flex-wrap: wrap;
    gap: 5px;
    display: flex;
  }

  .undo-redo-section {
    justify-content: flex-start;
  }

  .toolbar button {
    padding: 5px 10px;
    border: none;
    background-color: #eee;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    min-width: 35px;
    position: relative;
  }

  .toolbar button[data-title]:hover::after {
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

  .toolbar button.active {
    background-color: #333;
    color: #fff;
  }

  .toolbar button:hover {
    background-color: #ccc;
  }

  .editor {
    min-height: 600px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.6;
    font-size: 16px;
    color: #333;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  :global(.ProseMirror) {
    flex-grow: 1;
    overflow: auto;
    padding: 10px;
    border: 1px solid #cccccc74;
    border-top: none;
  }

  :global(.ProseMirror-focused) {
    border-color: rgba(51, 58, 80, 0.305);
    border-top: 1px solid rgba(51, 58, 80, 0.305);
    outline: none;
  }
</style>
