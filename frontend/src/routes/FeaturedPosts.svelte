<script lang="ts">
  export let highlightedPosts: App.Post[];
</script>

<section class="featured-posts">
  <h1>Featured Posts</h1>
  <div class="featured-grid">
    {#each highlightedPosts as { title, content, id, thumbnailUrl }}
      <div class="featured-item">
        {#if thumbnailUrl}
          <div class="featured-thumbnail">
            <img src={thumbnailUrl} alt="Thumbnail for {title}" />
          </div>
        {/if}
        <div class="post-content">
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .featured-posts {
    padding: 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .featured-posts h1 {
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
  }

  .featured-grid {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    padding: 0 2rem;
    max-width: 1200px;
  }

  .featured-item {
    background-color: #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    width: calc(33.333% - 1rem); /* Allowing for gap */
    box-sizing: border-box;
  }

  .featured-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .featured-thumbnail img {
    width: 100%;
    object-fit: cover;
    border-bottom: 2px solid #eee;
  }

  .post-content {
    padding: 1.5rem;
  }

  .post-content h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
  }

  .post-content p {
    margin: 0;
    color: #555;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .featured-grid,
    .featured-item {
      width: 100%;
      padding: 0;
    }
  }
</style>
