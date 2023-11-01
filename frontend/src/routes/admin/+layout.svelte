<div class="flex h-screen bg-gray-100">
  <!-- Sidebar -->
  <div class="bg-gray-800 p-4 w-64">
    <nav>
      <ul>
        <li><a href="/admin" class="text-white">Dashboard</a></li>
        <!-- ... other nav links -->
      </ul>
    </nav>
  </div>

  <!-- Main Content -->
  <div class="flex-grow p-4">
    <header class="flex justify-between items-center mb-4">
      <input type="search" placeholder="Search" class="p-2 rounded border" />
      <!-- Notifications and User Account Menu -->
    </header>
    <main>
      <slot />
    </main>
  </div>
</div>
