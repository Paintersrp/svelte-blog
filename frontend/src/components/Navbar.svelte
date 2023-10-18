<script>
  import { theme } from '$stores/theme';

  const toggleTheme = () => {
    theme.toggleTheme();
  };
</script>

<header>
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="/">Blog</a>
    </div>
    <div class="navbar-menu">
      <a href="/">Home</a>
      <a href="/create">Create</a>
      <a href="/login">Login</a>
    </div>
    <div class="navbar-end">
      <button class="theme-toggle" on:click={toggleTheme}>
        <svg
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-moon svg-container"
          viewBox="0 0 16 16"
        >
          <path d="M11.5 0a6.5 6.5 0 0 0 6.5 6.5h-13A6.5 6.5 0 0 0 11.5 0z" />
        </svg>
      </button>
    </div>
  </nav>
</header>

<style>
  header {
    background-color: var(--backgroundNavbar);
    color: var(--sidebarText);
    padding: var(--spacingMedium);
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    font-size: var(--fontSizeLg);
    font-weight: bold;
  }
  .navbar-brand a {
    color: var(--sidebarText);
  }

  .navbar-menu a {
    margin: 0 var(--spacingSmall);
    color: var(--sidebarText);
    text-decoration: none;
    position: relative;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .navbar-menu a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--sidebarText);
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  .navbar-menu a:hover::after {
    visibility: visible;
    width: 100%;
  }

  .navbar-end {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .theme-toggle {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  .svg-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
