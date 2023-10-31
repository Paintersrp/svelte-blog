<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { backIn, backOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import { userMenuVisible } from '$lib/stores/usermenu';
  import { navbarVisible } from '$lib/stores/navbar';

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleWindowClick);
      return () => {
        window.removeEventListener('click', handleWindowClick);
      };
    }
  });

  function handleWindowClick(event: any) {
    if (!event.target.closest('.user-menu')) {
      userMenuVisible.set(false);
    }
  }

  function handleClick() {
    userMenuVisible.set(!$userMenuVisible);
  }

  $: marginTop = $navbarVisible ? 'mt-2' : 'mt-6';
</script>

<div class="relative user-menu z-0">
  <button
    class="p-1.5 rounded-full bg-lime-900 border-lime-900 hover:bg-lime-300 transition ease-in-out duration-150 text-lime-300 hover:text-lime-900"
    on:click={handleClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      id="person"
      ><path
        d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
      /></svg
    >
  </button>
  {#if $userMenuVisible}
    <div
      in:fly={{
        duration: 400,
        x: 100,
        easing: backOut
      }}
      out:fly={{
        duration: 400,
        x: 100,
        easing: backIn
      }}
      class="absolute right-0 {marginTop} w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-0 transition transform origin-top-right duration-500 ease-in-out"
    >
      {#if !$page.data.user}
        <a
          href="/login"
          on:click={handleClick}
          class="block px-4 py-2 text-gray-700 hover:bg-lime-200 rounded-t-lg">Login</a
        >
        <a
          href="/register"
          on:click={handleClick}
          class="block px-4 py-2 text-gray-700 hover:bg-lime-200 rounded-b-lg">Register</a
        >
      {/if}

      {#if $page.data.user}
        <a
          href="/"
          on:click={handleClick}
          class="block px-4 py-2 text-gray-700 hover:bg-lime-200 rounded-t-lg">Admin</a
        >
        <a
          href={`/?logout=true`}
          on:click={handleClick}
          class="block px-4 py-2 text-gray-700 hover:bg-lime-200">Logout</a
        >

        <div
          class="flex justify-between items-center px-4 py-2 border-t border-gray-200 text-gray-700 hover:bg-lime-200 rounded-b-lg"
        >
          <div class="text-gray-700">Dark Mode</div>
          <input type="checkbox" class="toggle toggle-sm" />
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .toggle {
    appearance: none;
    outline: none;
    width: 2rem;
    height: 1rem;
    border-radius: 1rem;
    position: relative;
    cursor: pointer;
    background-color: #ccc;
    transition: background-color 0.2s;
  }
  .toggle::before {
    content: '';
    position: absolute;
    top: 1.75px;
    left: 0.125rem;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 0.75rem;
    background-color: white;
    transition: transform 0.2s;
  }
  .toggle:checked {
    background-color: #6aa22b;
  }
  .toggle:checked::before {
    transform: translateX(0.95rem);
  }
</style>
