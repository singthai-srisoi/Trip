<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import CustomeSvg from '$lib/components/CustomeSVG.svelte';


	let { children } = $props();

  onMount(async () => {
    const module = await import('cally')
  })
  let cally1 = $state('Pick a date')


  
</script>

<section>
  <h1 class="text-2xl font-bold">Triping</h1>
</section>
<main>
	{@render children()}
</main>


<button popovertarget="cally-popover1" class="input input-border" id="cally1" style="anchor-name:--cally1">
  {cally1}
</button>
<div popover id="cally-popover1" class="dropdown bg-base-100 rounded-box shadow-lg" style="position-anchor:--cally1">
  <!-- svelte-ignore event_directive_deprecated -->
  <calendar-date class="cally" on:change={(e: any) => cally1 = e.target.value}>
    <CustomeSvg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></CustomeSvg>
    <CustomeSvg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></CustomeSvg>
    <calendar-month></calendar-month>
  </calendar-date>
</div>