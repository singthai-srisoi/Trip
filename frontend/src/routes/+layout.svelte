<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import MenuIcon from './MenuIcon.svelte';
	import { page } from '$app/state';
	import { fade, fly, scale } from 'svelte/transition';
	import { elasticInOut } from 'svelte/easing';
	import type { LayoutData } from './$types';
	import { getPageTransition } from './pageTransition';
  interface Props {
    data: {
        currentPath: string;
        previousPath: string;
    } | LayoutData
    children: Snippet
  }

	let { 
    data,
    children 
  }: Props = $props();
  let bounce_in = {duration: 625, easing: elasticInOut, start: 0.5}
  let fade_out = {duration: 300}
</script>

<section class="min-h-screen pb-[80px] overflow-auto relative">
  {#key data.currentPath}
  {#await Promise.resolve(getPageTransition(data.previousPath ?? '', data.currentPath)) then tr}
    <main
      class="p-6 lg:p-25 md:p-10 mt-3"
      in:tr.transition={tr.params}
    >
      {@render children()}
    </main>
  {/await}
    <!-- <main class="p-6 lg:p-25 md:p-10 mt-3"
      in:fly={{ y: 20, duration: 50 }}
    >
      {@render children()}
    </main> -->
    
  {/key}
  
  <footer class="footer fixed bottom-0 left-0 z-9999 w-full border-t border-base-300 grid-cols-3 items-center bg-base-200 text-base-content p-4 md:p-10 lg:px-25">
      <MenuIcon href={"/trips"} is_active={page.route.id?.includes('/(main)/trips')}>
        {#snippet active()}
          <svg class="w-5 h-5 size-1.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
            in:scale={bounce_in}
          >
            <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z" clip-rule="evenodd"/>
          </svg>
        {/snippet}
        {#snippet inactive()}
          <svg class="w-5 h-5 size-1.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
            in:fade={fade_out}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
          </svg>
        {/snippet}
        Trips
      </MenuIcon>
      <MenuIcon href={"/drivers"} is_active={page.route.id?.includes('/(admin)')}>
        {#snippet active()}
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
            in:scale={bounce_in}
          >
            <path d="m7.4 3.736 3.43 3.429A5.046 5.046 0 0 1 12.133 7c.356.01.71.06 1.056.147l3.41-3.412a2.32 2.32 0 0 1 .451-.344A9.89 9.89 0 0 0 12.268 2a10.022 10.022 0 0 0-5.322 1.392c.165.095.318.211.454.344Zm11.451 1.54-.127-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.03.023.05.054.078.077.237.194.454.41.651.645.033.038.077.067.11.107l2.926-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.025.03-.058.052-.082.082a4.97 4.97 0 0 1-.633.639c-.04.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.443-4.763a3.037 3.037 0 0 0-1.383-1.1l-.012-.007a2.956 2.956 0 0 0-1-.213H12a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.009.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .488 1.716l.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.319.129.657.2 1 .213.393.015.784-.05 1.15-.192.012-.005.021-.013.033-.018a3.01 3.01 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.349.447l-3.426 3.426c.112.428.166.869.161 1.311a4.954 4.954 0 0 1-.148 1.054l3.413 3.412c.133.134.249.283.347.444A9.88 9.88 0 0 0 22 12.269a9.913 9.913 0 0 0-1.386-5.319ZM16.6 20.264l-3.42-3.421c-.386.1-.782.152-1.18.157h-.135c-.356-.01-.71-.06-1.056-.147L7.4 20.265a2.503 2.503 0 0 1-.444.347A9.884 9.884 0 0 0 11.732 22H12a9.9 9.9 0 0 0 5.044-1.388 2.515 2.515 0 0 1-.444-.348ZM3.735 16.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L3.735 7.4a2.508 2.508 0 0 1-.349-.447 9.889 9.889 0 0 0 0 10.1 2.48 2.48 0 0 1 .35-.453Zm5.101-.758a4.959 4.959 0 0 1-.65-.645c-.034-.038-.078-.067-.11-.107L5.15 18.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.029-.018-.049-.053-.078-.076Zm-.755-6.928c.03-.037.07-.063.1-.1.183-.22.383-.423.6-.609.046-.04.081-.092.128-.13L5.983 5.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707l2.932 2.931Z"/>
          </svg>

        {/snippet}
        {#snippet inactive()}
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
            in:fade={fade_out}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13.46 8.291 3.849-3.849a1.5 1.5 0 0 1 2.122 0l.127.127a1.5 1.5 0 0 1 0 2.122l-3.84 3.838a4 4 0 0 0-2.258-2.238Zm0 0a4 4 0 0 1 2.263 2.238l3.662-3.662a8.961 8.961 0 0 1 0 10.27l-3.676-3.676m-2.25-5.17 3.678-3.676a8.961 8.961 0 0 0-10.27 0l3.662 3.662a4 4 0 0 0-2.238 2.258L4.615 6.863a8.96 8.96 0 0 0 0 10.27l3.662-3.662a4 4 0 0 0 2.258 2.238l-3.672 3.676a8.96 8.96 0 0 0 10.27 0l-3.662-3.662a4.001 4.001 0 0 0 2.238-2.262m0 0 3.849 3.848a1.5 1.5 0 0 1 0 2.122l-.127.126a1.499 1.499 0 0 1-2.122 0l-3.838-3.838a4 4 0 0 0 2.238-2.258Zm.29-1.461a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-7.718 1.471-3.84 3.838a1.5 1.5 0 0 0 0 2.122l.128.126a1.5 1.5 0 0 0 2.122 0l3.848-3.848a4 4 0 0 1-2.258-2.238Zm2.248-5.19L6.69 4.442a1.5 1.5 0 0 0-2.122 0l-.127.127a1.5 1.5 0 0 0 0 2.122l3.849 3.848a4 4 0 0 1 2.238-2.258Z"/>
          </svg>

        {/snippet}
        Admin
      </MenuIcon>
      <MenuIcon href={"/preference"} is_active={page.route.id == '/(main)/preference'}>
        {#snippet active()}
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
            in:scale={bounce_in}
          >
            <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
          </svg>
        {/snippet}
        {#snippet inactive()}
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
            in:fade={fade_out}
          >
            <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
        {/snippet}
        Preference
      </MenuIcon>
  </footer>

</section>

<style>
  footer {
    box-shadow: 0 -4px 8px -1px rgba(0, 0, 0, 0.1); /* Top shadow */
  }
</style>