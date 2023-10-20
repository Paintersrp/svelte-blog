<script lang="ts">
  export let posts: App.Post[];
  export let search: string;
</script>

<section class="recent-posts">
  <h1>Recent Posts</h1>
  <div class="recent-flex">
    {#each posts.filter((post) => !search || post.title.includes(search)) as { title, content, id, thumbnailUrl }}
      <div class="post-card">
        {#if thumbnailUrl}
          <div class="thumbnail">
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
  .recent-posts h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 700;
    color: #333;
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

  .recent-posts {
    margin-top: 2rem;
  }

  .recent-flex {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
    display: flex;
  }

  .post-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .thumbnail {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 8px;
  }

  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    .post-card {
      flex-direction: column;
      align-items: center;
    }

    .thumbnail {
      width: 150px;
      height: 150px;
    }
  }
</style>
