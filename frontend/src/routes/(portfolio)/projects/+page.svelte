<script lang="ts">
  import { blur, fly, slide } from 'svelte/transition';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { projectsDirIn, projectsDirOut } from '$lib/stores/projectsDirection';
  import { writable } from 'svelte/store';
  import { flip } from 'svelte/animate';
  import { sineIn, sineOut } from 'svelte/easing';

  let projects = [
    {
      id: 1,
      title: 'Personal Blog',
      description: 'A space where I share my thoughts and experiences.',
      details: 'Built with SvelteKit, styled with TailwindCSS, and optimized for SEO.',
      imgUrl: 'https://placehold.jp/150x150.png'
    },
    {
      id: 2,
      title: 'Sports Predictor',
      description: 'Machine Learning model to predict sports game outcomes.',
      details: 'Utilizes Python, Scikit-learn, and historical data for prediction accuracy.',
      imgUrl: 'https://placehold.jp/150x150.png'
    },
    {
      id: 3,
      title: 'Sales Forecaster',
      description: 'A tool for forecasting sales and logistics requirements.',
      details: 'Incorporates ML algorithms to process data and forecast demand.',
      imgUrl: 'https://placehold.jp/150x150.png'
    },
    {
      id: 4,
      title: 'API Gateway',
      description: 'Serves all projects with additional features.',
      details: 'Features anomaly detection and a microservice architecture for efficiency.',
      imgUrl: 'https://placehold.jp/150x150.png'
    }
  ];

  const selectedProject = writable<App.Project>(projects[0]);
  const previousProject = writable<App.Project | null>();
  let displayedProjects = projects.filter((p) => p.id !== $selectedProject.id);

  function selectProject(project: App.Project) {
    previousProject.set($selectedProject);
    selectedProject.set(project);
    updateDisplayedProjects();
  }

  function updateDisplayedProjects() {
    displayedProjects = displayedProjects.filter((p) => p.id !== $selectedProject.id);

    if ($previousProject) {
      displayedProjects = [...displayedProjects, $previousProject];
    }
  }

  beforeNavigate(({ to }) => {
    if (to) {
      const route = to.route.id;

      if (route === '/(portfolio)/portfolio') {
        $projectsDirOut = 500;
      } else if (route === '/(portfolio)/third') {
        $projectsDirOut = -500;
      }
    }
  });

  afterNavigate(({ to }) => {
    if (to) {
      const route = to.route.id;

      if (route === '/(portfolio)/portfolio') {
        $projectsDirIn = 500;
      } else if (route === '/(portfolio)/third') {
        $projectsDirIn = -500;
      }
    }
  });
</script>

<div
  class="flex-grow flex flex-col justify-center"
  in:fly={{ y: $projectsDirIn, duration: 500, delay: 700 }}
  out:fly={{ y: $projectsDirOut, duration: 500 }}
>
  <main class="justify-center items-center flex flex-col mx-auto p-4 md:p-12 space-y-12 max-w-7xl">
    <h1 class="text-5xl md:text-6xl font-bold text-white text-center mb-12">Projects Portfolio</h1>

    <div class="flex overflow-hidden w-full pb-4 space-x-4">
      {#each displayedProjects as project (project.id)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          role="button"
          tabindex="0"
          class="project-card min-w-max flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow transition-all hover:shadow-lg p-4 cursor-pointer"
          on:click={() => selectProject(project)}
          animate:flip={{ duration: 1000, delay: 0 }}
        >
          <img
            src={project.imgUrl}
            alt={project.title}
            class="w-32 h-32 object-cover mb-2 rounded"
          />
          <h3 class="text-xl font-bold text-white">{project.title}</h3>
        </div>
      {/each}
    </div>
    <section
      class="flex flex-col items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl rounded-lg p-8 mb-6 w-full max-w-4xl min-h-[350px]"
    >
      {#key $selectedProject}
        <div
          in:slide={{ duration: 500, delay: 500, easing: sineOut }}
          out:slide={{ duration: 500, easing: sineIn }}
        >
          <h2 class="text-3xl font-bold text-white mb-4">{$selectedProject.title}</h2>
          <img
            src={$selectedProject.imgUrl}
            alt={$selectedProject.title}
            class="md:w-1/2 lg:w-1/3 mx-auto mb-4 object-cover rounded"
          />
          <p class="text-gray-300 mb-2">{$selectedProject.description}</p>
          <p class="text-gray-400 text-sm">{$selectedProject.details}</p>
        </div>
      {/key}
    </section>
  </main>
</div>

<style>
  .project-card:hover {
    transform: translateY(-5px);
  }
</style>
