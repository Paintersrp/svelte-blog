<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { sineIn, sineOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  import { estimateReadTime } from '$lib/utils/estimateReadTime';
  import { normalizeDate } from '$lib/utils/normalizeDate';

  export let posts: App.Post[];
  export let currentCategories: (number | string)[];

  const dispatch = createEventDispatcher();

  const hidePost = (value: number) => {
    dispatch('hidePost', value);
  };

  $: filteredPosts = currentCategories.includes('All')
    ? posts
    : posts.filter((post) => currentCategories.includes(post.Category.id));
</script>

<section class="px-4 md:px-8 py-2 lg:py-8">
  <div class="divide-y divide-gray-200">
    {#each filteredPosts as post (post.id)}
      <div
        class="flex-col items-start py-2 md:py-6"
        in:slide|local={{ duration: 300, easing: sineIn, axis: 'y' }}
        out:slide|local={{ duration: 300, easing: sineOut, axis: 'y' }}
      >
        <div class="flex">
          {#if post.thumbnailUrl}
            <div class="mr-4 flex flex-shrink-0 justify-center items-center">
              <a href={`/${post.id}`}>
                <img
                  src={post.thumbnailUrl}
                  alt="Thumbnail for {post.title}"
                  class="rounded-lg w-20 h-20 md:w-48 md:h-36 object-cover"
                />
              </a>
            </div>
          {/if}
          <div class="flex-grow">
            <a href={`/${post.id}`} class="text-decoration-none">
              <h2
                class="text-lg md:text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:underline"
              >
                {post.title}
              </h2>
            </a>
            <div class="mb-2 text-gray-700 text-sm whitespace-normal hidden lg:block">
              {post.content.substring(0, 250)}
            </div>
            <div class="mb-2 text-sm text-gray-500">
              By {post.User.username} • {normalizeDate(post.createdAt)}
            </div>
            <div class="flex flex-wrap mt-2">
              {#each post.Tags as tag}
                <span
                  class="bg-lime-200 text-lime-700 rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-2"
                  >{tag.name}</span
                >
              {/each}
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center md:mt-2">
          <div class="text-gray-500 text-sm">
            <span class="font-semibold text-lime-700">{post.Category.name}</span>
            • {post.Comments.length}
            {#if post.Comments.length === 1} comment {:else} comments {/if} • {estimateReadTime(
              post.content
            )}
          </div>
          <div>
            <button
              on:click={() => hidePost(post.id)}
              class="p-1.5 rounded-full bg-transparent hover:bg-lime-900 transition ease-in-out duration-150 text-lime-900 hover:text-lime-300"
            >
              <div class="text-inherit transition ease-in-out duration-150">
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  ><path
                    d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"
                  /></svg
                >
              </div>
            </button>
            <button
              class="p-1.5 rounded-full bg-transparent hover:bg-lime-900 transition ease-in-out duration-150 text-lime-900 hover:text-lime-300"
            >
              <a href={`/${post.id}`} class="text-lime-900 hover:text-lime-300">
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  ><path
                    d="m298-262-56-56 121-122H80v-80h283L242-642l56-56 218 218-218 218Zm222-18v-80h360v80H520Zm0-320v-80h360v80H520Zm120 160v-80h240v80H640Z"
                  /></svg
                >
              </a>
            </button>
          </div>
        </div>
      </div>
    {/each}
    <div id="end-of-posts" />
  </div>
</section>
