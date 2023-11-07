<script lang="ts">
  import AnimatedText from '$comp/home/AnimatedText.svelte';
  import { fly } from 'svelte/transition';

  const skills = [
    'TypeScript',
    'Python',
    'React',
    'Svelte',
    'Backend Systems',
    'Cloud Services',
    'Containerization',
    'CI/CD Pipelines',
    'Database Management (SQL & NoSQL)',
    'RESTful & GraphQL APIs',
    'Progressive Web Apps',
    'Machine Learning',
    'Data Engineering',
    'Data Visualization'
  ];
</script>

<div
  class="flex-grow flex flex-col items-center justify-center p-12 md:p-12 space-y-6 max-w-full lg:p-4 mx-auto"
  in:fly={{ y: -500, duration: 500, delay: 700 }}
  out:fly={{ y: -500, duration: 500 }}
>
  <header class="text-center space-y-4">
    <h1 class="text-6xl font-bold text-white md:text-8xl leading-none shadow-text">
      Steven Painter
    </h1>
    <AnimatedText
      messages={skills}
      textClass="text-5xl font-bold text-amber-300"
      containerClass="w-full text-center"
    />
    <p class="text-xl md:text-2xl text-white font-light">
      Fullstack Developer | Backend Enthusiast | UI/UX Dabbler
    </p>
  </header>

  <section class="text-white text-center space-y-6">
    <p class="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate? Saepe quam
      aliquid et, in quaerat veritatis explicabo sunt voluptates, assumenda dignissimos adipisci
      non. Rem, nesciunt! Quod ratione quam aut.
    </p>
  </section>
</div>
