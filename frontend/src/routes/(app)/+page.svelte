<script lang="ts">
  import { onMount } from 'svelte';

  import { CategoryScroller, FullPosts, Hero, HomeSidebar } from '$comp/home';
  import { Loading } from '$comp/general';

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
<div id="container" class="flex justify-center">
  <!-- Update Sidebar to have buttons for categories on larger displays, hidden on smaller -->
  <!-- <HomeSidebar bind:search bind:posts bind:totalPosts /> -->
  <main id="content" class="max-w-[1000px] min-h-[60vh] w-full">
    <FullPosts bind:posts {currentCategories} on:hidePost={hidePost} />
    {#if isLoading}
      <Loading message="Loading more posts..." />
    {/if}
  </main>
</div>
