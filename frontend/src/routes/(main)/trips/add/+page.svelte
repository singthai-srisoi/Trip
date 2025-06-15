<svelte:head>
    <title>add</title>
</svelte:head>

<script lang="ts">

	// import "cally";
    import date from "date-and-time";
	import type { PageData } from "./$types";
	import CustomeSvg from "$lib/components/CustomeSVG.svelte";
	import { onMount } from "svelte";

    interface Props {
        data: {
        } | PageData
    }

    let {
    }: Props = $props()

    onMount(async () => {
        const cally = await import('cally')
    })

    let today = date.format(
        new Date,
        "YYYY-MM-DD"
    )
    let trip = $state({
        from: '',
        to: '',
        date: today,
    })
</script>


<div class={"mb-6 w-full flex items-baseline justify-between"}>
    <h1 class="text-2xl font-semibold">Add Trip</h1>
    <a class="btn btn-ghost btn-sm bg-base-300" href="/trips">Back</a>
</div>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/trips">Trips</a></li>
    <li>Add</li>
  </ul>
</div>


<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend class="fieldset-legend">Details</legend>

<button popovertarget="cally-popover1" class="input input-border w-full" id="cally1" style="anchor-name:--cally1">
  {trip.date}
</button>
<div popover id="cally-popover1" class="dropdown bg-base-100 rounded-box shadow-lg" style="position-anchor:--cally1">
  <!-- svelte-ignore event_directive_deprecated -->
  <calendar-date class="cally" on:change={(e: any) => trip.date = e.target.value}>
    <CustomeSvg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></CustomeSvg>
    <CustomeSvg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></CustomeSvg>
    <calendar-month></calendar-month>
  </calendar-date>
</div>

<input type="text" class="input w-full" placeholder="Vehicle" list="vehicles" />
    <datalist id="vehicles">
    <option value="Chrome"></option>
    <option value="Firefox"></option>
    <option value="Safari"></option>
    <option value="Opera"></option>
    <option value="Edge"></option>
    </datalist>

<div class="join w-full">
    <input type="text" class="input" placeholder="From" list="browsers" />
    <datalist id="browsers">
    <option value="Chrome"></option>
    <option value="Firefox"></option>
    <option value="Safari"></option>
    <option value="Opera"></option>
    <option value="Edge"></option>
    </datalist>

    <input type="text" class="input" placeholder="To" list="browsers_to" />
    <datalist id="browsers_to">
    <option value="Chrome"></option>
    <option value="Firefox"></option>
    <option value="Safari"></option>
    <option value="Opera"></option>
    <option value="Edge"></option>
    </datalist>

</div>

 <button class="btn btn-primary">Add</button>
</fieldset>