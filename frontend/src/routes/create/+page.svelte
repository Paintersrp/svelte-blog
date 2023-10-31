<script lang="ts">
  import { sineIn, sineOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { enhance } from '$app/forms';

  import { redirectWithToast } from '$lib/utils/redirectWithToast';
  import Editor from '$comp/editor/Editor.svelte';

  let postContent: string = '';

  $: step = 1;

  function handleNextStep() {
    step++;
  }

  function handlePrevStep() {
    step--;
  }

  function handleSubmit() {
    // Implement submit functionality
  }

  function handleSaveDraft() {
    // Implement save draft functionality
  }
</script>

<div id="container" class="flex flex-col h-screen p-4 md:p-8">
  {#if step === 1}
    <main
      id="content"
      class="flex flex-col space-y-4 p-4 bg-gray-50 shadow-lg rounded-lg"
      in:fly={{ x: -100, duration: 300, delay: 300, easing: sineOut }}
      out:fly={{ x: 100, duration: 300, easing: sineIn }}
    >
      <h2 class="text-2xl font-bold text-gray-800">Compose Post</h2>
      <Editor bind:content={postContent} />
      <button
        class="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition flex items-center justify-center"
        on:click={handleNextStep}
      >
        Next
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg
        >
      </button>
    </main>
  {:else if step === 2}
    <div
      class="flex flex-col space-y-4 p-4 bg-gray-50 shadow-lg rounded-lg"
      in:fly={{ x: -100, duration: 300, delay: 300, easing: sineOut }}
      out:fly={{ x: 100, duration: 300, easing: sineIn }}
    >
      <form
        id="publish"
        method="POST"
        action="?/addPost"
        enctype="multipart/form-data"
        use:enhance={() => redirectWithToast('Post Successful!')}
      >
        <h2 class="text-2xl font-bold text-gray-800">Publish</h2>
        <div class="flex flex-col mb-6">
          <label class="mb-2 text-gray-700" for="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            class="p-2 border rounded"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label class="mb-2 text-gray-700" for="thumbnailUrl">Thumbnail</label>
          <input
            type="file"
            id="thumbnailUrl"
            name="thumbnailUrl"
            accept="image/*"
            class="p-2 border rounded"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label class="mb-2 text-gray-700" for="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            class="p-2 border rounded"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label class="mb-2 text-gray-700" for="tags">Tags (comma-separated)</label>
          <input type="text" id="tags" name="tags" placeholder="Tags" class="p-2 border rounded" />
        </div>
        <div>
          <input
            name="content"
            type="text"
            id="content"
            placeholder=" "
            bind:value={postContent}
            class="hidden"
          />
        </div>
        <div class="flex justify-center items-center w-full space-x-4">
          <button class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
            Publish
          </button>
        </div>
      </form>

      <button
        class="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition flex items-center justify-center"
        on:click={handlePrevStep}
      >
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" /></svg
        >
        Back
      </button>
    </div>
  {/if}
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  #content {
    width: 100%;
  }
</style>
