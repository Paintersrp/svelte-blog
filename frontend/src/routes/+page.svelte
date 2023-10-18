<script lang="ts">
  import HomeSidebar from './HomeSidebar.svelte';

  export let data;

  let posts: App.Post[] = data.posts || [];
  let totalPosts: number = data.totalPosts || 0;
  let search: string = '';
</script>

<div id="container">
  <HomeSidebar bind:posts bind:totalPosts bind:search />

  <main id="content">
    <ul>
      {#each posts.filter((post) => !search || post.title.includes(search)) as { title, content, id, thumbnail }}
        <li>
          {#if thumbnail}
            <div class="thumbnail">
              <img src={thumbnail} alt="Thumbnail for {title}" />
            </div>
          {/if}
          <div class="post-content">
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
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

  #content {
    padding: var(--spacingMedium);
    width: 100%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    align-items: flex-start;
    padding: var(--spacingMedium);
    margin-bottom: var(--spacingMedium);
    border-radius: var(--borderRadius);
    transition: transform cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s,
      box-shadow cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s;
    border: 1px solid var(--borderColor);
  }

  li:hover {
    transform: translateY(-3px);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }

  .thumbnail {
    margin-right: var(--spacingMedium);
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: var(--borderRadius);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  }

  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .post-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin: 0 0 var(--spacingSmall) 0;
    font-size: calc(var(--fontSizeLg) + 0.05rem);
    font-weight: 600;
    color: var(--primaryColor);
    transition: color cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  h2:hover {
    color: var(--primaryColorHover);
  }

  p {
    margin: 0;
    color: var(--textSecondary);
    line-height: 1.5;
  }
</style>
