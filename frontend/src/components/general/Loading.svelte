<script lang="ts">
  export let message = '';
  export let py = 'py-6';
</script>

<div class={`flex justify-center items-center ${py}`}>
  <div class="loading-indicator flex items-center space-x-2">
    <svg
      class="animate-spin h-5 w-5 text-lime-900"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 1.26.313 2.446.874 3.466l1.578-1.175z"
      />
    </svg>
    {#if message}
      <div class="text-gray-500 text-sm">{message}</div>
    {/if}
  </div>
</div>
