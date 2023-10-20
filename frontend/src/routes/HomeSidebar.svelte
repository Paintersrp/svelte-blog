<script lang="ts">
  export let posts: App.Post[];
  export let totalPosts: number;
  export let search: string;

  let currentPage: number = 1;

  let categoryOptions = [
    { id: 1, value: '', text: 'All' },
    { id: 2, value: 'tech', text: 'Tech' },
    { id: 3, value: 'lifestyle', text: 'Lifestyle' }
  ];

  let pageSizeOptions = [
    { id: 1, value: '', text: 10 },
    { id: 2, value: 25, text: 25 },
    { id: 3, value: 50, text: 50 },
    { id: 4, value: 75, text: 75 },
    { id: 5, value: 100, text: 100 }
  ];

  const handlePagination = async (page: number, size: number) => {
    const response = await fetch(`http://localhost:4000/posts?pageSize=${size}&page=${page}`).then(
      (res) => res.json()
    );
    posts = response.data.data;
    totalPosts = response.data.count;
  };

  $: pageSize = 25;
</script>

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
    <button on:click={() => handlePagination(--currentPage, pageSize)} disabled={currentPage === 1}>
      Previous
    </button>
    <span>Page {currentPage} of {Math.ceil(totalPosts / pageSize)}</span>
    <button
      on:click={() => handlePagination(++currentPage, pageSize)}
      disabled={currentPage * pageSize >= totalPosts}
    >
      Next
    </button>
  </div>

  <label for="pageSize">Items per page:</label>
  <select
    id="pageSize"
    bind:value={pageSize}
    on:change={() => handlePagination(currentPage, pageSize)}
  >
    {#each pageSizeOptions as option}
      <option value={option.value}>{option.text}</option>
    {/each}
  </select>
</aside>

<style>
  #sidebar {
    min-width: var(--sidebarWidth);
    background-color: var(--backgroundSidebar);
    padding: var(--spacingSmall);
    position: sticky;
    top: 0;
    height: calc(100vh);
    overflow-y: auto;
    box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.05);
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

  h2 {
    margin: 0 0 var(--spacingSmall) 0;
    font-size: var(--fontSizeLg);
  }
</style>
