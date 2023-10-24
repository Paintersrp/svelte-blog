<script lang="ts">
  import { blur, fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import Hero from './Hero.svelte';
  import CategoryScroller from './CategoryScroller.svelte';
  import FullPosts from './FullPosts.svelte';
  import HomeSidebar from './HomeSidebar.svelte';
  import { onMount } from 'svelte';
  import Loading from '$comp/Loading.svelte';

  export let data;

  let categories = data.categories || [];
  let posts: App.Post[] = data.posts || [];
  let totalPosts: number = data.totalPosts || 0;
  let totalPages: number = Math.round(data.totalPosts / 25);

  let search: string = '';
  let currentCategory: string = '';
  let page = 1;
  let isLoading = false;

  const loadMorePosts = async () => {
    page += 1;

    if (isLoading || page > totalPages) return;

    isLoading = true;

    await new Promise((resolve) => setTimeout(resolve, 750));

    const response = await fetch(
      `http://localhost:4000/posts?pageSize=25&page=${page}&includes=User,Comment,Tag,Category`
    );
    const data = await response.json();
    posts = [...posts, ...data.data.data];

    setTimeout(() => {
      isLoading = false;
    }, 750);
  };

  onMount(() => {
    const endOfPostsElement = document.querySelector('#end-of-posts');

    if (endOfPostsElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMorePosts();
          }
        },
        { threshold: 1 }
      );
      observer.observe(endOfPostsElement);
    }
  });

  const handleCategorySelect = (event: { detail: string }) => {
    currentCategory = event.detail;
  };

  const hidePost = (event: { detail: number }) => {
    posts = posts.filter((post) => post.id !== event.detail);
  };
</script>

<Hero />
<CategoryScroller {categories} on:categorySelect={handleCategorySelect} />
<div id="container">
  <!-- Update Sidebar to have buttons for categories on larger displays, hidden on smaller -->
  <!-- <HomeSidebar bind:search bind:posts bind:totalPosts /> -->
  <main id="content">
    <FullPosts bind:posts on:hidePost={hidePost} />
    {#if isLoading}
      <Loading />
    {/if}
  </main>
</div>

<style>
  #container {
    display: flex;
    background-color: var(--background);
    color: var(--textPrimary);
    justify-content: center;
  }

  #content {
    width: 100%;
    max-width: 1000px;
  }
</style>
