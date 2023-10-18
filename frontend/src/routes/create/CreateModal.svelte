<script lang="ts">
  export let handleSubmit: any;
  export let handleSaveDraft: any;
  export let postTitle: string;
  export let toggleModal: any;
</script>

<div class="modal">
  <div class="modal-overlay" on:click={toggleModal} />
  <div class="modal-content">
    <button class="close-button" on:click={toggleModal}>✖</button>
    <input
      type="text"
      placeholder="Title"
      bind:value={postTitle}
      aria-label="Post Title"
      class="input-field"
    />
    <input type="text" placeholder="Tags" aria-label="Tags" class="input-field" />
    <select aria-label="Select Category" class="select-field">
      <option value="category1">Category 1</option>
    </select>
    <button on:click={handleSubmit} class="action-button publish-button">Publish</button>
    <button on:click={handleSaveDraft} class="action-button save-draft-button">Save Draft</button>
  </div>
</div>

<style>
  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease-in-out;
    z-index: 1000;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    cursor: pointer;
  }

  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    position: relative;
    overflow-y: auto;
    max-height: 80%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  .input-field,
  .select-field,
  .action-button {
    width: 100%;
    margin-bottom: 10px;
  }
</style>
