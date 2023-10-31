<script lang="ts">
  import { normalizeDate } from '$lib/utils/normalizeDate.js';
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';

  import { enhance } from '$app/forms';
  import { enhanceWithToast } from '$lib/utils/enhanceWithToast.js';

  export let data;
  export let form;

  $: post = data.post;
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
  <footer class="pt-6 bg-lime-100 p-4 rounded-lg shadow-lg">
    <div class="text-gray-500 text-sm mb-4">
      {post.Comments.length}
      {post.Comments.length === 1 ? ' comment' : ' comments'}
    </div>

    {#each post.Comments as comment, index (comment.id)}
      <div class="mt-6 pt-6 bg-lime-50 p-4 rounded-lg shadow-sm" transition:slide>
        <div class="flex items-center mb-2">
          <div class="mr-4">
            <img
              src="https://via.placeholder.com/50"
              alt="{comment.User.username}'s avatar"
              class="rounded-full w-10 h-10"
            />
          </div>
          <div class="flex w-full justify-between">
            <span class="font-semibold text-gray-800">{comment.User.username}</span>
            <span class="ml-2 text-sm text-gray-500">#{index + 1}</span>
          </div>
        </div>
        <p class="text-sm text-gray-500">
          {comment.content}
        </p>
      </div>
    {/each}

    <form
      method="POST"
      action="?/addComment"
      class="mt-6 border-t pt-6"
      use:enhance={() => enhanceWithToast('Comment Succesful!')}
    >
      <textarea
        id="content"
        name="content"
        class="w-full p-2 border rounded-lg border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500 {$page
          .data.user
          ? ''
          : 'bg-gray-200 cursor-not-allowed'}"
        placeholder={$page.data.user ? 'Add a comment...' : 'Login to add comments'}
        rows={4}
        disabled={!$page.data.user}
      />
      {#if form?.missing}
        <p class="text-red-500">This field is required</p>
      {/if}
      <button
        class="mt-2 px-4 py-2 bg-lime-600 text-white rounded-lg {$page.data.user && !form?.missing
          ? 'hover:bg-lime-700'
          : 'bg-gray-200 cursor-not-allowed'}"
        disabled={!$page.data.user && !form?.missing}
      >
        Submit
      </button>
    </form>
  </footer>
</article>
