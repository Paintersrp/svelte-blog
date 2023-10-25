<script lang="ts">
  export let posts: App.Post[];
  export let totalPosts: number;
</script>

<aside id="sidebar">
  <section id="filters">
    <h2>Filter</h2>
    <label for="category">Category:</label>
    <select id="category">
      <option value="">All</option>
      <option value="tech">Tech</option>
      <option value="lifestyle">Lifestyle</option>
    </select>
  </section>
</aside>

<style>
  #sidebar {
    min-width: var(--sidebarWidth);
    background-color: var(--background);
    padding: var(--spacingSmall);
    position: sticky;
    top: 0;
    height: calc(100vh);
    overflow-y: auto;
    margin-top: 18px;
  }

  h2 {
    margin: 0 0 var(--spacingSmall) 0;
    font-size: var(--fontSizeLg);
  }

  @media (max-width: 768px) {
    #sidebar {
      display: none;
    }
  }
</style>
