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
      <a href="/contact">Contact</a>
    </div>
    <div class="navbar-end">
      <button class="theme-toggle" on:click={toggleTheme}>
        <svg width="24" height="24" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
          <path d="M11.5 0a6.5 6.5 0 0 0 6.5 6.5h-13A6.5 6.5 0 0 0 11.5 0z" />
        </svg>
      </button>
    </div>
  </nav>
</header>

<style>
  header {
    background-color: var(--backgroundSidebar);
    color: var(--textPrimary);
    padding: var(--spacingMedium);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: var(--spacingMedium);
    padding-right: var(--spacingMedium);
  }

  .navbar-brand {
    font-size: var(--fontSizeLg);
    font-weight: bold;
  }

  .navbar-menu a {
    margin: 0 var(--spacingSmall);
    color: var(--textPrimary);
    text-decoration: none;
    position: relative;
  }

  .navbar-menu a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--textPrimary);
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  .navbar-menu a:hover::after {
    visibility: visible;
    width: 100%;
  }

  .navbar-end {
    display: flex;
  }

  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>
