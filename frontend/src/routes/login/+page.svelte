<script lang="ts">
  // export let form;
</script>

<section class="flex flex-grow items-center justify-center p-8">
  <div
    class="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl bg-gradient-to-r from-lime-500 to-lime-600 gap-8 mb-class"
  >
    <div class="hidden md:flex md:w-1/2 px-6 py-2">
      <img src="/undraw_login.svg" alt="Illustration" class="w-full h-auto" />
    </div>
    <div class="md:w-1/2 p-4">
      <h2 class="text-3xl font-bold mb-6 text-white text-center">Login</h2>

      <form method="POST" action="?/login" class="space-y-6">
        <div class="relative">
          <input
            id="email"
            name="email"
            type="email"
            placeholder=" "
            class="block w-full p-2 border bg-gray-100 text-gray-800 mt-3"
            required
          />
          <label for="email" class="absolute top-0 left-0 mt-2.5 ml-3 text-gray-700">Email</label>
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
        <div class="flex items-center justify-between mb-6">
          <div>
            <input
              name="remember"
              id="remember-me"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-lime-600"
            />
            <label for="remember-me" class="ml-2 text-white text remember">Remember me</label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full py-1.5 px-4 bg-white text-lime-600 font-semibold transition-colors hover:bg-lime-600 hover:text-white border border-white"
            >Log in</button
          >
        </div>
      </form>
      <div class="mt-4 text-center">
        <a href="/forgot-password" class="text-white hover:text-lime-900 font-semibold text-sm"
          >Forgot password?</a
        >
        <br />
        <a href="/register" class="text-white hover:text-lime-900 font-semibold text-sm"
          >New here? Register now</a
        >
      </div>
    </div>
  </div>
</section>

<style>
  .remember {
    font-size: 0.95rem !important;
  }
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
