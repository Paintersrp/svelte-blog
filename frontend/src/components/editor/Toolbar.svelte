<script lang="ts">
  import { handleAction } from './utils/handleAction';

  export let editor: any;

  const historyItems = [
    {
      action: () => editor!.chain().undo().run(),
      label: '<i class="fas fa-undo" />',
      title: 'Undo'
    },
    {
      action: () => editor!.chain().redo().run(),
      label: '<i class="fas fa-redo" />',
      title: 'Redo'
    }
  ];
</script>

<div class="toolbar">
  <div class="undo-redo-section">
    {#each historyItems as { action, label, title }}
      <button on:click={() => handleAction(action, editor)} data-title={title}>
        {@html label}
      </button>
    {/each}
  </div>
</div>

<style>
  .toolbar {
    font-family: 'Inter';
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .toolbar > * {
    flex-wrap: wrap;
    gap: 2px;
    display: flex;
  }

  .undo-redo-section {
    justify-content: flex-start;
  }

  .toolbar button {
    padding: 5px 10px;
    border: none;
    background-color: #eee;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    min-width: 35px;
    position: relative;
  }

  .toolbar button[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 6px;
    border-radius: 6px;
    white-space: nowrap;
    margin-top: 10px;
    z-index: 1;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .toolbar button:hover {
    background-color: #ccc;
  }
</style>
