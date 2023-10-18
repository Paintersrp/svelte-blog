<script lang="ts">
  import Flexer from '../../components/Flexer.svelte';

  export let isMobile: boolean;
  export let postTitle: string;
  export let handleSubmit: any;
  export let handleSaveDraft: any;
</script>

<aside id="sidebar" class:active={isMobile}>
  <Flexer>
    <input
      type="text"
      placeholder="Title"
      bind:value={postTitle}
      aria-label="Post Title"
      class="input-field"
    />
  </Flexer>
  <Flexer><input type="text" placeholder="Tags" aria-label="Tags" class="input-field" /></Flexer>
  <select aria-label="Select Category" class="select-field">
    <option value="category1">Category 1</option>
  </select>

  <button on:click={handleSubmit} class="action-button publish-button">Publish</button>
  <button on:click={handleSaveDraft} class="action-button save-draft-button">Save Draft</button>
</aside>

<style>
  #sidebar {
    min-width: var(--sidebarWidth);
    max-width: var(--sidebarWidth);
    background-color: var(--backgroundSidebar);
    padding: var(--spacingSmall);
    position: sticky;
    top: 0;
    height: calc(100vh);
    overflow-y: auto;
  }

  #sidebar.active {
    display: none;
  }

  .input-field,
  .select-field {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  .action-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .publish-button {
    background-color: var(--primaryColor);
    color: #fff;
  }

  .publish-button:hover {
    background-color: var(--primaryColorHover);
  }

  .save-draft-button {
    background-color: #ccc;
    color: #333;
  }

  .save-draft-button:hover {
    background-color: #bbb;
  }
</style>
