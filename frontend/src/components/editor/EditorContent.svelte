<script lang="ts">
  import { beforeUpdate, onDestroy, onMount, tick } from 'svelte';
  import type { Editor } from './utils/Editor';

  let element: HTMLElement;
  export let editor: Editor;

  const init = async () => {
    await tick();
    if (!editor?.options.element) {
      return;
    }

    if (editor.contentElement) {
      return;
    }

    element.append(...Array.from(editor.options.element.childNodes));
    editor.setOptions({ element });

    editor.contentElement = element;
  };

  onMount(init);
  beforeUpdate(init);

  onDestroy(() => {
    if (!editor) {
      return;
    }

    editor.contentElement = null;

    if (!editor.options.element.firstChild) {
      return;
    }

    const newElement = document.createElement('div');
    newElement.append(...Array.from(editor.options.element.childNodes));

    editor.setOptions({
      element: newElement
    });
  });
</script>

<div class="editor" bind:this={element} />

<style>
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
</style>
