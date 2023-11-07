<script lang="ts">
  import { writable } from 'svelte/store';
  import { sineIn, sineOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { enhance } from '$app/forms';

  import { redirectWithToast } from '$lib/utils';
  import { Editor } from '$comp/editor';
  import { FormError, Loading } from '$comp/general';

  export let form;
  const isLoading = writable(false);

  let errors: Record<string, string> = {};
  let postContent: string = '';

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

  $: step = 1;

  $: if (form?.errors) {
    errors = { ...form.errors };
  }
</script>

<!-- <pre class="flex flex-grow">
  {JSON.stringify(form, null, 2)}
</pre> -->

<div id="container" class="flex flex-col h-screen p-1">
  {#if step === 1}
    <main
      id="content"
      class="flex flex-col space-y-4"
      in:fly={{ x: -100, duration: 300, delay: 300, easing: sineOut }}
      out:fly={{ x: 100, duration: 300, easing: sineIn }}
    >
      <Editor bind:content={postContent} />
      <button
        class="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition flex items-center justify-center disabled:bg-gray-300"
        on:click={handleNextStep}
        disabled={!postContent}
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
      class="flex flex-col space-y-4 p-4 md:p-6 dark:bg-gray-800 shadow-md rounded-lg"
      in:fly={{ x: -100, duration: 300, delay: 300, easing: sineOut }}
      out:fly={{ x: 100, duration: 300, easing: sineIn }}
    >
      <form
        id="publish"
        method="POST"
        action="?/addPost"
        enctype="multipart/form-data"
        use:enhance={() => redirectWithToast({ message: 'Post Successful!', isLoading })}
      >
        <h2 class="text-2xl font-bold text-gray-800">Publish</h2>

        <div class="flex flex-col mb-6">
          <label class="mb-2 text-gray-700" for="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={form?.data?.title ?? ''}
            class="p-2 border rounded"
          />
          {#if errors.title}
            <FormError message={errors.title} color="text-red-500" />
          {/if}
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
          {#if errors.thumbnailUrl}
            <FormError message={errors.thumbnailUrl} color="text-red-500" />
          {/if}
        </div>
        <div class="flex flex-col mb-6">
          <label class="mb-2 text-gray-700" for="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            value={form?.data?.category ?? ''}
            class="p-2 border rounded"
          />
          {#if errors.category}
            <FormError message={errors.category} color="text-red-500" />
          {/if}
        </div>
        <div class="flex flex-col mb-6">
          <label class="mb-2 text-gray-700" for="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Tags"
            value={form?.data?.tags ?? ''}
            class="p-2 border rounded"
          />
          {#if errors.tags}
            <FormError message={errors.tags} color="text-red-500" />
          {/if}
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
          <button
            disabled={!postContent}
            class="px-6 py-2 min-w-[90px] bg-blue-500 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-300"
          >
            {#if $isLoading}
              <Loading py="py-0" />
            {:else}
              Publish
            {/if}
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
