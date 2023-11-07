<script lang="ts">
  import AnimatedText from './AnimatedText.svelte';

  const categoryData = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Rust',
    'C#',
    'C++',
    'Java',
    'Svelte',
    'React',
    'NodeJS',
    'NextJS',
    'Django'
  ];
</script>

<section
  class="flex items-center justify-between p-8 md:p-12 bg-gradient-to-r from-lime-500 to-lime-600 text-white shadow-lg"
>
  <div class="max-w-md mx-auto md:mx-0">
    <AnimatedText
      messages={categoryData}
      textClass="text-5xl font-bold text-lime-900"
      containerClass="w-full"
    />
    <h1 class="text-3xl mb-4 font-extrabold text-white">Engage with Our Community</h1>

    <p class="text-lg mb-8">
      Discover new perspectives, engage with like-minded individuals, and explore diverse topics.
    </p>

    <a
      href="/get-started"
      class="bg-lime-100 text-lime-900 py-2 px-8 rounded-full font-semibold transition-colors hover:bg-lime-900 hover:text-lime-100"
      >Get Started</a
    >
  </div>
  <div class="hidden md:block">
    <img src="/undraw-blogging.svg" alt="Blogging Illustration" />
  </div>
</section>
