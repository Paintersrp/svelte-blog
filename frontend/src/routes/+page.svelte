<script lang="ts">
  import FeaturedPosts from './FeaturedPosts.svelte';
  import FullPosts from './FullPosts.svelte';
  import HomeSidebar from './HomeSidebar.svelte';

  export let data;

  let posts: App.Post[] = data.posts || [];
  let totalPosts: number = data.totalPosts || 0;
  let search: string = '';

  let highlightedPosts = posts.filter((post) => post.highlighted);
</script>

<FeaturedPosts {highlightedPosts} />

<div id="container">
  <HomeSidebar bind:posts bind:totalPosts bind:search />

  <main id="content">
    <FullPosts bind:posts bind:search />
  </main>
</div>

<style>
  #container {
    display: flex;
    background-color: #f0f0f0;
    color: #333;
    justify-content: center;
  }

  #content {
    padding: 2rem;
    width: 100%;
    max-width: 1000px;
  }
</style>
