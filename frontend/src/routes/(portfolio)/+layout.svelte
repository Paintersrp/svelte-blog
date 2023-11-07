<script lang="ts">
  import { GithubIcon, LinkedinIcon, TwitterIcon, MessageIcon, UpArrow, DownArrow } from './svgs';
  import { cubicIn, cubicOut, sineIn, sineOut } from 'svelte/easing';
  import { writable } from 'svelte/store';
  import { blur, fly, slide } from 'svelte/transition';
  import MenuIcon from '$comp/layout/MenuIcon.svelte';

  export let data;

  let isMenuOpen = writable(false);

  function toggleMenu() {
    isMenuOpen.update((n) => !n);
  }

  const socials = [
    { name: 'GitHub', url: 'https://github.com/', icon: GithubIcon },
    { name: 'LinkedIn', url: 'https://linkedin.com/', icon: LinkedinIcon },
    { name: 'Twitter', url: 'https://twitter.com/', icon: TwitterIcon },
    { name: 'Email', url: 'paintersrp@gmail.com', icon: MessageIcon }
  ];

  $: pathname = data.url;
</script>

<div class="flex flex-col bg-gradient-to-br from-cyan-500 to-blue-700 min-h-screen overflow-hidden">
  <header class="p-1 fixed flex top-0 right-0 justify-end z-50">
    <MenuIcon open={$isMenuOpen} onClick={toggleMenu} />
  </header>

  {#if pathname === '/portfolio'}
    <div
      class="fixed bottom-0 left-0 w-full p-4 z-40 flex justify-center"
      in:fly={{ y: 50, delay: 700 }}
      out:fly={{ y: 50, duration: 700 }}
    >
      <a
        href="/projects"
        class="bg-gray-700 rounded-full p-2 focus:outline-none focus:ring focus:border-blue-300"
        aria-label="Explore Projects"
      >
        <img src={DownArrow} alt="arrow down" class="h-8 w-8" />
      </a>
    </div>
  {/if}

  {#if pathname === '/projects'}
    <div
      class="fixed top-0 pt-4 left-0 mr-24 w-full z-40 flex justify-center"
      in:fly={{ y: -50, delay: 700 }}
      out:fly={{ y: -50, duration: 700 }}
    >
      <a
        href="/portfolio"
        class="bg-gray-700 rounded-full p-2 focus:outline-none focus:ring focus:border-blue-300 flex flex-col"
        aria-label="Explore Projects"
      >
        <img src={UpArrow} alt="arrow up" class="h-8 w-8 text-white" />
      </a>
    </div>
    <div
      class="fixed bottom-0 left-0 pb-4 w-full z-40 flex justify-center"
      in:fly={{ y: 50, delay: 700 }}
      out:fly={{ y: 50, duration: 700 }}
    >
      <a
        href="/third"
        class="bg-gray-700 rounded-full p-2 focus:outline-none focus:ring focus:border-blue-300 flex flex-col"
        aria-label="Explore Projects"
      >
        <img src={DownArrow} alt="arrow down" class="h-8 w-8 text-white" />
      </a>
    </div>
  {/if}

  {#if pathname === '/third'}
    <div
      class="fixed top-0 pt-4 left-0 mr-24 w-full z-40 flex justify-center"
      in:fly={{ y: -50, delay: 700 }}
      out:fly={{ y: -50, duration: 700 }}
    >
      <a
        href="/projects"
        class="bg-gray-700 rounded-full p-2 focus:outline-none focus:ring focus:border-blue-300 flex flex-col"
        aria-label="Explore Projects"
      >
        <img src={UpArrow} alt="arrow up" class="h-8 w-8 text-white" />
      </a>
    </div>
  {/if}

  <slot />

  <aside
    class="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-center space-y-4 p-4 bg-opacity-20 bg-black rounded-l-lg z-50"
  >
    {#each socials as social}
      <a
        href={social.url}
        class="hover:opacity-80 transition-opacity duration-300 ease-in-out"
        target="_blank"
        rel="noopener noreferrer"
        title={social.name}
      >
        <img src={social.icon} alt={social.name} class="h-8 w-8 text-white" />
      </a>
    {/each}
  </aside>
</div>

{#if $isMenuOpen}
  <div
    in:blur={{ easing: sineOut, amount: 15, duration: 300 }}
    out:blur={{ easing: sineIn, amount: 15, duration: 300 }}
    class="fixed inset-0 bg-gradient-to-br to-cyan-500 from-blue-700 flex items-center justify-center p-4 z-40"
  >
    <div class="flex flex-col" data-sveltekit-preload-data="tap" data-sveltekit-preload-code="tap">
      <a
        on:click={toggleMenu}
        href="/portfolio"
        class="text-5xl md:text-6xl font-bold text-white hover:text-amber-300 text-center leading-tight mb-4 hover:underline"
        >Home</a
      >
      <a
        on:click={toggleMenu}
        class="text-5xl md:text-6xl font-bold text-white hover:text-amber-300 text-center leading-tight mb-4 hover:underline"
        href="/projects">Projects</a
      >
      <a
        on:click={toggleMenu}
        class="text-5xl md:text-6xl font-bold text-white hover:text-amber-300 text-center leading-tight mb-4 hover:underline"
        href="/">Blog</a
      >
    </div>
    <!-- <div
      class="fixed top-1/2 -left-1/2 ml-10 w-full z-40 flex justify-center"
      in:fly={{ x: -50, delay: 300 }}
      out:fly={{ x: -50 }}
    >
      Projects
    </div> -->
  </div>
{/if}
