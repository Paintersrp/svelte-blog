<div class="flex items-center text-lime-900 gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    height="30"
    viewBox="0 -960 960 960"
    width="30"
    class="hidden md:block"
    ><path
      d="M160-120q-33 0-56.5-23.5T80-200v-640l67 67 66-67 67 67 67-67 66 67 67-67 67 67 66-67 67 67 67-67 66 67 67-67v640q0 33-23.5 56.5T800-120H160Zm0-80h280v-240H160v240Zm360 0h280v-80H520v80Zm0-160h280v-80H520v80ZM160-520h640v-120H160v120Z"
    /></svg
  >
  <a href="/" class="text-2xl font-extrabold text-lime-900 hover:text-lime-300 transition-colors"
    >Blog</a
  >
</div>

<style>
  a::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: hsl(92 61% 20% / var(--tw-text-opacity));
    transition: width 0.3s;
  }

  a:hover::after {
    width: 100%;
  }
</style>
