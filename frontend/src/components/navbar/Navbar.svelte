<script lang="ts">
  import { onMount } from 'svelte';

  import UserMenu from './UserMenu.svelte';
  import WriteButton from './WriteButton.svelte';
  import SearchBar from './SearchBar.svelte';
  import NavbarTitle from './NavbarTitle.svelte';
  import { navbarVisible } from '$lib/stores/navbar';

  let lastScrollTop = 0;

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  });

  function handleScroll() {
    let st = window.scrollY || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 0) {
      navbarVisible.set(false);
    } else {
      navbarVisible.set(true);
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }
</script>

<header
  class={`fixed top-0 w-full bg-gradient-to-r from-lime-500 to-lime-600 p-4 transition-all duration-300 shadow-md ${
    $navbarVisible ? '' : '-translate-y-full'
  } ${$navbarVisible ? 'md:translate-y-0' : ''} z-10`}
>
  <nav class="w-full mx-auto flex justify-between items-center">
    <div class="flex items-center lg:space-x-6 md:space-x-4 sm:space-x-2 w-full">
      <NavbarTitle />
      <SearchBar />
    </div>
    <div class="flex items-center space-x-2">
      <WriteButton />
      <UserMenu />
    </div>
  </nav>
</header>
