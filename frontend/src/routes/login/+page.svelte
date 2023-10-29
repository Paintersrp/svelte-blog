<script lang="ts">
  export let form;
  import { applyAction, enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { toastStore } from '$lib/stores/toast';

  console.log(form);
</script>

<pre class="flex mx-4 my-2 rounded-sm min-h-[250px] bg-lime-300 border border-lime-600">
  {JSON.stringify(form, null, 2)}
</pre>
<section class="flex flex-grow items-center justify-center p-8">
  <div
    class="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl bg-gradient-to-r from-lime-400 to-lime-400 gap-8 mb-class"
  >
    <div class="hidden md:flex md:w-1/2 px-6 py-2">
      <img src="/undraw_login.svg" alt="Illustration" class="w-full h-auto" />
    </div>
    <div class="md:w-1/2 p-4">
      <h2 class="text-3xl font-bold mb-6 text-white text-center">Login</h2>

      <form
        method="POST"
        class="space-y-6"
        use:enhance={() => {
          return async ({ result }) => {
            if (result.type === 'redirect') {
              goto(result.location).then(() =>
                setTimeout(
                  () => toastStore.addToast('Login Successful!', 'success', 'top-right', 5000),
                  400
                )
              );
            } else {
              await applyAction(result);
            }
          };
        }}
      >
        <div class="relative">
          <input
            id="username"
            name="username"
            type="text"
            placeholder=" "
            value={form?.data.username ?? ''}
            class="block w-full p-2 border bg-gray-100 text-gray-800 mt-3"
          />
          <label for="username" class="absolute top-0 left-0 mt-2.5 ml-3 text-gray-700"
            >Username</label
          >
          {#if form?.errors.username}
            <p class="text-red-600 text-base mt-1 font-semibold">Username is required.</p>
          {/if}
        </div>
        <div class="relative">
          <input
            id="password"
            name="password"
            type="password"
            placeholder=" "
            value={form?.data.password ?? ''}
            class="block w-full p-2 border bg-gray-100 text-gray-800 mt-3"
          />
          <label for="password" class="absolute top-0 left-0 mt-2.5 ml-3 text-gray-700"
            >Password</label
          >
          {#if form?.errors.password}
            <p class="text-red-600 text-base mt-1 font-semibold">Password is required.</p>
          {/if}
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
        <!-- <a href="/forgot-password" class="text-white hover:text-lime-900 font-semibold text-sm"
          >Forgot password?</a
        > -->
        <!-- <br /> -->
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
