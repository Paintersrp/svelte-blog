<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { Readable } from 'svelte/store';
  import StarterKit from '@tiptap/starter-kit';
  import TextAlign from '@tiptap/extension-text-align';
  import Image from '@tiptap/extension-image';
  import Underline from '@tiptap/extension-underline';

  import { axios } from '$lib/utils/axios';

  import type { Editor } from './utils/Editor';
  import createEditor from './utils/createEditor';

  import Toolbar from './Toolbar.svelte';
  import EditorContent from './EditorContent.svelte';
  import FloatingToolbar from './FloatingToolbar.svelte';
  import BubbleToolbar from './BubbleToolbar.svelte';

  export let content: string = '<p>Hello World</p>';

  let uploadedImages: string[] = [];
  let editor: Readable<Editor>;
  const dispatch = createEventDispatcher();

  onMount(() => {
    editor = createEditor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Image,
        Underline
      ],
      content: content,
      onUpdate: ({ editor }) => {
        const newContent = editor.getHTML();
        if (newContent !== content) {
          content = newContent;
          dispatch('contentUpdate', content);
          console.log(content);
        }
      },
      editorProps: {
        attributes: {
          class: 'rounded-md shadow-md p-3 outline-none '
        }
      }
    });
  });

  $: if ($editor && content !== $editor.getHTML()) {
    $editor.commands.setContent(content);
  }

  onDestroy(() => {
    if ($editor) {
      $editor.destroy();
    }
  });

  function addImage(url: string) {
    $editor.chain().focus().setImage({ src: url }).run();
  }

  async function handleFileSelection(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/upload', formData);
      const imageUrl = response.data;
      addImage(imageUrl);
      uploadedImages.push(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
</script>

{#if editor}
  <Toolbar editor={$editor} on:fileSelected={(event) => handleFileSelection(event.detail)} />
{/if}

{#if editor}
  <BubbleToolbar {editor} />
{/if}

{#if editor}
  <FloatingToolbar {editor} on:fileSelected={(event) => handleFileSelection(event.detail)} />
{/if}

<EditorContent editor={$editor} />

<style>
  :global(.ProseMirror) {
    flex-grow: 1;
    overflow: auto;
    padding: 10px;
    border: 1px solid #cccccc74;
  }

  :global(.ProseMirror-focused) {
    border-color: rgba(51, 58, 80, 0.305);
    border-top: 1px solid rgba(51, 58, 80, 0.305);
    outline: none;
  }

  :global(.ProseMirror strong) {
    font-weight: bold;
  }

  :global(.ProseMirror em) {
    font-style: italic;
  }

  :global(.ProseMirror s) {
    text-decoration: line-through;
  }

  :global(.ProseMirror code) {
    font-family: monospace;
  }

  :global(.ProseMirror blockquote) {
    margin: 0;
    padding-left: 1em;
    border-left: 2px solid #ccc;
  }

  :global(.ProseMirror ul, .ProseMirror ol) {
    margin: 0;
    padding-left: 2.5em;
  }

  :global(.ProseMirror ol) {
    list-style-type: decimal;
    margin: 0;
    padding-left: 2.5em;
  }

  :global(.ProseMirror ul) {
    list-style-type: disc;
    margin: 0;
    padding-left: 2.5em;
  }

  :global(.ProseMirror li) {
    margin: 0;
  }

  :global(.ProseMirror pre) {
    background-color: #bab9b9;
    margin: 1rem 0rem;
    padding: 1rem;
    overflow-x: auto;
  }

  :global(.ProseMirror h1) {
    font-size: 2em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  :global(.ProseMirror h2) {
    font-size: 1.75em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  :global(.ProseMirror h3) {
    font-size: 1.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  :global(.ProseMirror h4) {
    font-size: 1.25em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  :global(.ProseMirror h5) {
    font-size: 1em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  :global(.ProseMirror h6) {
    font-size: 0.875em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  :global(.ProseMirror img) {
    display: block;
    max-width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 8px;
    margin: 0 auto;
  }
</style>
