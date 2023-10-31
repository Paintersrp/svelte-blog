<script lang="ts">
  import { enhance } from '$app/forms';
  import { redirectWithToast } from '$lib/utils/redirectWithToast';
</script>

<section class="flex flex-grow items-center justify-center p-8">
  <div
    class="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl bg-gradient-to-r from-lime-500 to-lime-600 gap-8 mb-class"
  >
    <div class="hidden md:flex md:w-1/2 px-6 py-2">
      <img src="/undraw_register.svg" alt="Illustration" class="w-full h-auto" />
    </div>
    <div class="md:w-1/2 p-4">
      <h2 class="text-3xl font-bold mb-6 text-white text-center">Register</h2>
      <form
        method="POST"
        action="?/register"
        class="space-y-6"
        use:enhance={() => redirectWithToast('Registration Successful!')}
      >
        <div class="relative">
          <input
            id="username"
            name="username"
            type="username"
            placeholder=" "
            class="block w-full p-2 border bg-gray-100 text-gray-800 mt-3"
            required
          />
          <label for="username" class="absolute top-0 left-0 mt-2.5 ml-3 text-gray-700"
            >Username</label
          >
        </div>
        <div class="relative">
          <input
            id="password"
            name="password"
            type="password"
            placeholder=" "
            class="block w-full p-2 border bg-gray-100 text-gray-800 mt-3"
            required
          />
          <label for="password" class="absolute top-0 left-0 mt-2.5 ml-3 text-gray-700"
            >Password</label
          >
        </div>
        <div class="relative">
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder=" "
            class="block w-full p-2 border bg-gray-100 text-gray-800 mt-3"
            required
          />
          <label for="confirm-password" class="absolute top-0 left-0 mt-2.5 ml-3 text-gray-700"
            >Confirm Password</label
          >
        </div>
        <div>
          <button
            type="submit"
            class="w-full py-1.5 px-4 bg-white text-lime-600 font-semibold transition-colors hover:bg-lime-600 hover:text-white border border-white"
            >Sign Up</button
          >
        </div>
      </form>
      <div class="mt-4 text-center">
        <a href="/login" class="text-white hover:text-lime-900 font-semibold text-sm"
          >Already have an account? Log in</a
        >
      </div>
    </div>
  </div>
</section>

<style>
  .mb-class {
    margin-bottom: 5vh;
  }
  section {
    min-height: 100vh;
  }
  label {
    transform-origin: 0 0;
    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    transform: translateY(-1.85rem) translateX(-0.5rem);
    font-size: 0.825rem;
    font-weight: 600;
  }
</style>
