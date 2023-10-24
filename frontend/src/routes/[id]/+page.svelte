<script lang="ts">
  import { blur } from 'svelte/transition';

  import { normalizeDate } from '$lib/normalizeDate.js';
  export let data;
  $: post = data.post;
  let newComment = '';

  function handleCommentSubmit() {
    console.log(newComment);
    newComment = '';
  }
</script>

<!-- <article class="max-w-7xl mx-auto my-4 p-4 sm:p-6 lg:p-8" transition:blur={{ amount: 5 }}> -->
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
  <footer class="border-t pt-6">
    <div class="text-gray-500 text-sm mb-4">
      {post.Comments.length}
      {post.Comments.length === 1 ? ' comment' : ' comments'}
    </div>

    {#each post.Comments as comment, index (comment.id)}
      <div class="mt-6 border-t pt-6">
        <div class="flex items-center mb-2">
          <div class="mr-4">
            <img
              src="https://via.placeholder.com/50"
              alt="{comment.User.username}'s avatar"
              class="rounded-full w-10 h-10"
            />
          </div>
          <div>
            <span class="font-semibold text-gray-800">{comment.User.username}</span>
            <span class="ml-2 text-sm text-gray-500">Comment #{index + 1}</span>
          </div>
        </div>
        <p class="text-sm text-gray-500">
          {comment.content}
        </p>
      </div>
    {/each}

    <div class="mt-6 border-t pt-6">
      <textarea
        class="w-full p-2 border rounded-lg border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500"
        placeholder="Add a comment..."
        rows={4}
        bind:value={newComment}
      />
      <button
        class="mt-2 px-4 py-2 bg-lime-600 text-white rounded-lg"
        on:click={handleCommentSubmit}
      >
        Submit
      </button>
    </div>
  </footer>
</article>
