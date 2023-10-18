<script lang="ts">
  import { fade } from 'svelte/transition';
  import { blur } from 'svelte/transition';
  import { fly } from 'svelte/transition';
  import { slide } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let form;

  console.log(form);
</script>

<div id="login-container">
  <div class="login-box">
    <form method="POST" action="?/login">
      <h2>Login</h2>
      <div class="form-group">
        <input name="email" type="email" placeholder=" " required />
        <label for="email">Email</label>
      </div>
      <div class="form-group">
        <input name="password" type="password" placeholder=" " required />
        <label for="password">Password</label>
      </div>
      <div class="btn-container">
        <button type="submit">Log in</button>
      </div>
      <a href="/forgot-password" class="forgot-password">Forgot password?</a>
    </form>
  </div>
</div>

<style>
  #login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: var(--background);
    color: var(--textPrimary);
  }

  .login-box {
    width: 350px;
    background-color: var(--backgroundSidebar);
    padding: var(--spacingMedium);
    border-radius: var(--borderRadius);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .form-group {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: var(--spacingLarge);
  }

  input {
    width: 100%;
    padding: var(--spacingSmall);
    border: 1px solid var(--borderColor);
    border-radius: var(--borderRadius);
    background-color: var(--background);
    color: var(--textPrimary);
    font-size: var(--fontSizeBase);
  }

  input:focus,
  button:focus {
    outline: none;
    border-color: var(--primaryColor);
  }

  label {
    position: absolute;
    top: 0.6rem;
    left: var(--spacingSmall);
    font-size: 1rem;
    font-weight: 500;
    color: var(--textSecondary);
    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    transform: translateY(-1.75rem) translateX(-0.25rem);
    font-size: 0.825rem;
    font-weight: 600;
  }

  button {
    padding: var(--spacingSmall);
    border: none;
    border-radius: var(--borderRadius);
    background-color: var(--primaryColor);
    color: var(--textPrimary);
    font-size: var(--fontSizeBase);
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: var(--primaryColorHover);
  }

  .btn-container {
    display: flex;
    justify-content: center;
    margin-bottom: var(--spacingMedium);
  }

  .forgot-password {
    font-size: 0.875rem;
    color: var(--textSecondary);
    text-decoration: none;
  }
</style>
