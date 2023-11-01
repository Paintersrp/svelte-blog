<script lang="ts">
  import { debounce } from 'lodash';
  import { normalizeDate } from '$lib/utils';
  import { flip } from 'svelte/animate';

  export let data;

  console.log(data.meta);

  let posts: App.Post[] = data.posts || [];
  let meta = data.meta || [];
  let currentPage = 1;

  const debouncedSearch = debounce(async (searchQuery) => {
    fetchPosts(1, searchQuery);
  }, 300);

  async function fetchPosts(page = 1, search = '') {
    const response = await fetch(
      `http://localhost:4000/posts?pageSize=20&page=${page}&includes=User,Comment,Tag,Category&searchColumns=title&search=${search}`
    );
    const responseData = await response.json();
    posts = responseData.data.data;
  }

  async function nextPage() {
    currentPage++;
    await fetchPosts(currentPage);
    scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function prevPage() {
    currentPage--;
    await fetchPosts(currentPage);
    scrollTo({ top: 0, behavior: 'smooth' });
  }

  let searchQuery = '';

  function handleSearch() {
    debouncedSearch(searchQuery);
  }
</script>

<div class="flex justify-between items-center p-4 bg-gray-200">
  <input
    type="text"
    bind:value={searchQuery}
    on:input={handleSearch}
    placeholder="Search posts..."
    class="p-2 border rounded flex-grow"
  />
</div>

<div class="overflow-x-auto p-4">
  <table class="min-w-full bg-white shadow-md rounded-lg">
    <thead class="bg-gray-800 text-white">
      <tr>
        <th class="py-2 px-4 text-left">ID</th>
        <th class="py-2 px-4 text-left">Title</th>
        <th class="py-2 px-4 text-left">Post Date</th>
        <th class="py-2 px-4 text-left">User</th>
        <th class="py-2 px-4 text-left">Category</th>
        <th class="py-2 px-4 text-left">Comments</th>
        <th class="py-2 px-4 text-left">Status</th>
        <th class="py-2 px-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each posts as post (post.id)}
        <tr class="text-gray-700">
          <td class="py-2 px-4 border-b">{post.id}</td>
          <td class="py-2 px-4 border-b">{post.title}</td>
          <td class="py-2 px-4 border-b">{normalizeDate(post.createdAt)}</td>
          <td class="py-2 px-4 border-b">{post.User.username}</td>
          <td class="py-2 px-4 border-b">{post.Category.name}</td>
          <td class="py-2 px-4 border-b">{post.Comments.length}</td>
          <td class="py-2 px-4 border-b">{post.status}</td>
          <td class="py-2 px-4 border-b flex space-x-2">
            <button
              class="material-symbols-outlined p-2 rounded bg-gray-200 hover:bg-gray-300"
              on:click={() => {}}>visibility</button
            >
            <button
              class="material-symbols-outlined p-2 rounded bg-gray-200 hover:bg-gray-300"
              on:click={() => {}}>edit</button
            >
            <button
              class="material-symbols-outlined p-2 rounded bg-gray-200 hover:bg-gray-300"
              on:click={() => {}}>delete</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<div class="p-4 flex justify-between">
  <button
    on:click={prevPage}
    disabled={currentPage === 1}
    class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Previous</button
  >
  <button on:click={nextPage} class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >Next</button
  >
</div>

<style>
</style>
