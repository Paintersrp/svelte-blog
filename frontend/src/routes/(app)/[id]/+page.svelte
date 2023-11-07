<script lang="ts">
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';

  import { enhanceWithToast, normalizeDate } from '$lib/utils';
  import { toastStore } from '$lib/stores';
  import { FormError } from '$comp/general';

  export let data;
  export let form;

  $: post = data.post;
  $: if (form?.missing) {
    setTimeout(() => toastStore.addToast('Comment is required', 'error', 'top-right', 7500), 400);
  }
</script>

<article class="max-w-7xl mx-auto my-4 p-4 sm:p-6 lg:p-8">
  <div class="mb-10 flex justify-center">
    {#if post.thumbnailUrl}
      <img
        src={post.thumbnailUrl}
        alt="Thumbnail for {post.title}"
        class="w-full lg:w-5/6 rounded-lg"
      />
    {/if}
  </div>
  <header class="mb-6">
    <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      {post.title}
    </h1>
    <div class="flex items-center mt-4 text-gray-500 text-sm">
      <div class="mr-6 flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="{post.User.username}'s avatar"
          class="rounded-full w-8 h-8 mr-2"
        />
        <span>By {post.User.username} • {normalizeDate(post.createdAt)}</span>
      </div>
      <div>
        <span class="font-semibold text-lime-700">{post.Category.name}</span>
      </div>
    </div>
    <div class="mt-4 flex flex-wrap">
      {#each post.Tags as tag}
        <span
          class="bg-lime-200 text-lime-700 rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-2"
        >
          {tag.name}
        </span>
      {/each}
    </div>
  </header>
  <section class="prose prose-lg text-gray-500 mx-auto mb-12">
    {@html post.content}
  </section>
  <footer class="pt-8 bg-lime-100 dark:bg-dark-50 p-6 rounded-lg shadow">
    <div class="text-gray-500 dark:text-gray-900 text-sm mb-6">
      {post.Comments.length}
      {post.Comments.length === 1 ? ' comment' : ' comments'}
    </div>

    {#each post.Comments as comment, index (comment.id)}
      <div
        class="mt-8 pt-6 bg-lime-50 dark:bg-lime-700 p-6 rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
        transition:slide
      >
        <div class="flex items-center mb-4">
          <div class="mr-4">
            <img
              src="https://via.placeholder.com/50"
              alt="{comment.User.username}'s avatar"
              class="rounded-full w-10 h-10"
            />
          </div>
          <div class="flex w-full justify-between">
            <span class="font-medium text-gray-800 dark:text-gray-50">{comment.User.username}</span>
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-50">#{index + 1}</span>
          </div>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-50">
          {comment.content}
        </p>
      </div>
    {/each}

    <form
      method="POST"
      action="?/addComment"
      class="mt-8 border-t pt-6"
      use:enhance={() => enhanceWithToast('Comment Successful!')}
    >
      <textarea
        id="content"
        name="content"
        class="w-full p-4 border border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500 dark:bg-gray-700 dark:border-green-600 dark:text-white dark:placeholder-gray-400"
        placeholder={$page.data.user ? 'Add a comment...' : 'Login to add comments'}
        rows={4}
        disabled={!$page.data.user}
      />
      {#if form?.missing}
        <FormError message="Comment is required" color="text-red-600 dark:text-red-400" />
      {/if}
      <button
        class="mt-4 px-6 py-3 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 transition-colors duration-300 ease-in-out"
        disabled={!$page.data.user}
      >
        Submit
      </button>
    </form>
  </footer>
</article>
