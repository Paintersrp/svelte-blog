<script lang="ts">
  import { onMount } from 'svelte';

  import Hero from '$comp/home/Hero.svelte';
  import CategoryScroller from '$comp/home/CategoryScroller.svelte';
  import FullPosts from '$comp/home/FullPosts.svelte';
  import HomeSidebar from '$comp/home/HomeSidebar.svelte';
  import Loading from '$comp/home/Loading.svelte';

  export let data;

  let categories: App.Category[] = data.categories || [];
  let posts: App.Post[] = data.posts || [];
  let totalPosts: number = data.totalPosts || 0;
  let totalPages: number = Math.round(data.totalPosts / 25);

  let currentCategories: string[] = ['All'];
  let page = 1;
  let isLoading = false;
  let isResetting = false;

  const loadMorePosts = async () => {
    page += 1;

    if (isLoading || page > totalPages) return;

    isLoading = true;

    const response = await fetch(
      `http://localhost:4000/posts?pageSize=25&page=${page}&includes=User,Comment,Tag,Category`
    );
    const responseData = await response.json();

    posts = [...posts, ...responseData.data.data];
    isLoading = false;
  };

  const loadFilteredPosts = async () => {
    isLoading = true;

    let url = `http://localhost:4000/posts?includes=User,Comment,Tag,Category`;

    if (currentCategories.length > 0 && !currentCategories.includes('All')) {
      const searchValues = currentCategories.join(',');
      url += `&searchColumns=categoryId&search=${searchValues}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    posts = data.data.data;

    isLoading = false;
  };

  onMount(() => {
    const endOfPostsElement = document.querySelector('#end-of-posts');

    if (endOfPostsElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!isResetting) {
            if (entries[0].isIntersecting) {
              if (currentCategories.includes('All')) {
                loadMorePosts();
              }
            }
          }
        },
        { threshold: 1 }
      );
      observer.observe(endOfPostsElement);
    }
  });

  const handleCategorySelect = async (event: { detail: string[] }) => {
    scrollTo({ top: 200, behavior: 'smooth' });

    if (event.detail.includes('All') || event.detail.length === 0) {
      isResetting = true;
      currentCategories = ['All'];
      page = 0;
      posts = [];
      await loadMorePosts();
      isResetting = false;
    } else {
      currentCategories = event.detail;
      page = 1;
      loadFilteredPosts();
    }
  };

  const hidePost = (event: { detail: number }) => {
    posts = posts.filter((post) => post.id !== event.detail);
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte Blog App - SRP" />
</svelte:head>

<Hero />
<CategoryScroller {categories} on:categorySelect={handleCategorySelect} />
<div id="container">
  <!-- Update Sidebar to have buttons for categories on larger displays, hidden on smaller -->
  <!-- <HomeSidebar bind:search bind:posts bind:totalPosts /> -->
  <main id="content">
    <FullPosts bind:posts {currentCategories} on:hidePost={hidePost} />
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
    min-height: 60vh;
  }
</style>
