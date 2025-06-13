<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>


<div class="bg-amber-50 min-h-screen flex flex-col items-center">
	<nav class="navbar bg-base-100 shadow-md border-b-1 border-b-gray-200 mb-3">
	<div class="flex-1">
		<span class="btn btn-ghost text-xl">Trip</span>
	</div>
	<div class="flex-none">
		
		<div class="dropdown dropdown-end">
		<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
			<div class="w-10 rounded-full">
			<img
				alt="Tailwind CSS Navbar component"
				src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
			</div>
		</div>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<ul
			tabindex="0"
			class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
			<li>
			<!-- svelte-ignore a11y_missing_attribute -->
			<a class="justify-between">
				Profile
				<!-- <span class="badge">New</span> -->
			</a>
			</li>
			<!-- svelte-ignore a11y_missing_attribute -->
			<!-- <li><a>Settings</a></li> -->
			<!-- svelte-ignore a11y_missing_attribute -->
			<li><a>Logout</a></li>
		</ul>
		</div>
	</div>
	</nav>

	<main class="flex-grow relative max-w-[100vw] w-full px-6 xl:pe-2">
		{@render children()}
	</main>

	<ul class="menu menu-horizontal bg-base-200 rounded-box shadow-xl border-1 border-gray-200 mb-4">
  <li>
    <a class="tooltip" data-tip="Home" href="/home" aria-label="home" data-sveltekit-reload>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </a>
  </li>
  <li>
    <a class="tooltip" data-tip="Profile" href="/profile" aria-label="profile" data-sveltekit-reload>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </a>
  </li>
  <li>
    <a class="tooltip" data-tip="Stats" aria-label="stats" href="/configuration">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </a>
  </li>
</ul>
</div>