<script lang="ts">
  import Modal from '$comp/CreateModal.svelte';
  import Sidebar from '$comp/CreateSidebar.svelte';
  import Editor from '$comp/Editor.svelte';
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let postTitle: string = '';
  let postContent: string = '';
  let isMobile = false;
  let showModal = false;

  onMount(() => {
    if (window.innerWidth <= 768) {
      isMobile = true;
    }

    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 768;
    });
  });

  function handleSubmit() {
    console.log({ title: postTitle, content: postContent });
    if (postTitle && postContent) {
      dispatch('submit', { title: postTitle, content: postContent });
    } else {
      alert('Title and Content are required.');
    }
  }

  function handleSaveDraft() {
    // Implement save draft functionality
  }

  const toggleModal = () => {
    showModal = !showModal;
  };
</script>

<div id="container">
  <button class="fab" on:click={() => (showModal = true)}>
    <i class="fas fa-solid fa-bars" />
  </button>
  <Sidebar bind:postTitle={postTitle} {isMobile} {handleSubmit} {handleSaveDraft} />
  <main id="content">
    <section>
      <Editor bind:content={postContent} />
    </section>
  </main>
</div>

{#if showModal}
  <Modal {handleSubmit} {handleSaveDraft} {postTitle} {toggleModal} />
{/if}

<style>
  #container {
    display: flex;
    background-color: var(--background);
    color: var(--textPrimary);
    height: 100vh;
  }

  #content {
    padding: var(--spacingMedium);
    width: 100%;
  }

  section {
    margin-bottom: var(--spacingLarge);
  }

  .fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--primaryColor);
    color: #fff;
    font-size: 21px;
    display: none;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
  }

  .fab:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    .fab {
      display: flex;
    }
  }

  @media (max-width: 768px) {
    #container {
      flex-direction: column;
    }
  }
</style>
