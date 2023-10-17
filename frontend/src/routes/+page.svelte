<script lang="ts">
  import { onMount } from 'svelte';
  import Editor from '$comp/Editor.svelte';
  import { getStores, navigating, page, updated } from '$app/stores';
  export let data;

  let posts: Post[] = data.posts || [];
  let currentPage: number = 1;
  let pageSize: number = 10;
  let totalPosts: number = data.totalPosts || 0 ;

  const loadPosts = async (page: number, size: number) => {
    const response = await fetch(`http://localhost:4000/posts?pageSize=${size}&page=${page}`).then(
      (res) => res.json()
    );
    posts = response.data.data;
    totalPosts = response.data.count;
  };

  let search: string = '';
</script>

<div id="container">
  <aside id="sidebar">
    <div class="search">
      <input type="text" bind:value={search} placeholder="Search..." />
    </div>
    <section id="filters">
      <h2>Filter</h2>
      <label for="category">Category:</label>
      <select id="category">
        <option value="">All</option>
        <option value="tech">Tech</option>
        <option value="lifestyle">Lifestyle</option>
      </select>
    </section>
    <div class="pagination">
      <button on:click={() => loadPosts(--currentPage, pageSize)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {Math.ceil(totalPosts / pageSize)}</span>
      <button
        on:click={() => loadPosts(++currentPage, pageSize)}
        disabled={currentPage * pageSize >= totalPosts}
      >
        Next
      </button>
    </div>

    <label for="pageSize">Items per page:</label>
    <select id="pageSize" bind:value={pageSize} on:change={() => loadPosts(currentPage, pageSize)}>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </aside>

  <main id="content">
  
    <ul>
      {#each posts.filter((post) => !search || post.title.includes(search)) as { title, content, id }}
        <li>
          <h2>{title}</h2>
          <p>{content}</p>
        </li>
      {/each}
    </ul>
  </main>
</div>

<style>
  #container {
    display: flex;
    background-color: var(--background);
    color: var(--textPrimary);
  }

  #sidebar {
    min-width: var(--sidebarWidth);
    background-color: var(--backgroundSidebar);
    padding: var(--spacingSmall);
    position: sticky;
    top: 0;
    height: calc(100vh);
    overflow-y: auto;
  }

  #content {
    /* margin-left: calc(var(--sidebarWidth) + 20px); */
    padding: var(--spacingMedium);
    width: 100%;
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type='text'] {
    width: 100%;
    padding: var(--spacingSmall);
    margin-bottom: var(--spacingMedium);
    border: 1px solid var(--borderColor);
    border-radius: var(--borderRadius);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: var(--spacingSmall);
    margin-bottom: var(--spacingSmall);
    border-bottom: 1px solid var(--borderColor);
  }

  h2 {
    margin: 0 0 var(--spacingSmall) 0;
    font-size: var(--fontSizeLg);
  }

  p {
    margin: 0;
  }
</style>
