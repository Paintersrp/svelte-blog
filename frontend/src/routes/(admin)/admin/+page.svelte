<script lang="ts">
  import { goto } from '$app/navigation';

  // Assume modelsMetadata is preloaded via load function
  export let modelsMetadata;

  let stats = [
    { label: 'Total Posts', value: 123 },
    { label: 'Total Users', value: 456 },
    { label: 'Total Comments', value: 789 }
  ];

  let recentActivity = [
    { description: 'User JohnDoe created a new post', timestamp: '2023-11-01 09:30' },
    { description: 'User JaneDoe commented on a post', timestamp: '2023-11-01 08:45' }
    // ... more activities
  ];

  function navigateToSection(section: string) {
    goto(`/admin/${section}`);
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
    {#each stats as { label, value }}
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <p class="text-gray-700">{label}</p>
        <p class="text-xl font-bold">{value}</p>
      </div>
    {/each}
  </div>

  <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h2 class="text-xl font-bold mb-4">Recent Activity</h2>
    <ul>
      {#each recentActivity as { description, timestamp }}
        <li class="mb-2">
          <p class="text-gray-700">{timestamp}: {description}</p>
        </li>
      {/each}
    </ul>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-bold mb-4">Posts</h2>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        on:click={() => navigateToSection('posts')}
      >
        Manage Posts
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- {#each modelsMetadata as { name, fields, validations, associations }}
      <div class="p-4 bg-white rounded shadow">
        <h2 class="text-xl font-semibold mb-2">{name}</h2>
        <p>Fields: {fields.length}</p>
        <p>Associations: {associations.length}</p>
      
        <button
          on:click={() => navigateToControlTable(name)}
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Manage {name}
        </button>
      </div>
    {/each} -->
  </div>
</div>
