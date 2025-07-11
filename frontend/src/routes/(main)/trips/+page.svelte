<script lang="ts">
  import date from 'date-and-time' 
	import type { PageData } from './$types';
  import type { destinations, trips, vehicles } from '$generated/prisma';
	import TripCard from '$lib/components/TripCard.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
  import {
    type DateValue,
  } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
	import { clickOutside } from '$lib/directive/clickOutside.svelte';

  interface trips_model extends trips {
    vehicles: vehicles
    destinations_trips_end_destination_idTodestinations: destinations
    destinations_trips_start_destination_idTodestinations: destinations
  }
  interface Props {
    data: PageData
  }

  let {
    data
  }: Props = $props()

  let data_ = $state(data)


  let now = new Date()
  let dt = date.format(now, "DD MMM, dddd")

  async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
		event.preventDefault();
    showCalendar = false
		const formdata = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formdata
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
      // console.log(result)
      // @ts-ignore
      data_.trips = result.data.trips
			await invalidateAll();
		}

		applyAction(result);
	}
  let value = $state<DateValue>();
    let dateStr = $derived(`${value?.year}-${value?.month}-${value?.day}`)
  $inspect({value})
  let showCalendar = $state(false);
</script>
<svelte:head>
  <title>Trips</title>
</svelte:head>

<div class={"mb-6 w-full md:flex items-baseline justify-between"}>
  <h1 class="text-2xl font-semibold mb-2">{dt}</h1>
  
  
  <div class="flex gap-2">
    <a class="btn btn-ghost btn-sm bg-base-300" href="/trips/add">Add</a>
    
    
    <a class="btn btn-ghost btn-sm bg-base-300" href="/trips/list">View All</a>
  </div>
  
</div>

<section class="active-trip mb-5">
  <h2 class={"text-xl font-semibold mb-2"}>Active Trip</h2>
  <form action="?/search" method="post" {onsubmit}>

    
        <label class="floating-label flex-grow mb-1">
            <span>Search</span>
            <input class="input input-border input-sm border border-base-300 w-full grow" name="search" placeholder="Search" />
        </label>

      <div class="w-full mb-2 flex justify-start items-center gap-2">

        <div class="relative">
          <button type="button" class="btn btn-ghost btn-sm bg-base-300" onclick={() => showCalendar = !showCalendar} use:clickOutside={() => showCalendar = false}>
            {value ? dateStr : 'Select Date'}
          </button>

          {#if showCalendar}
            <div class="absolute z-50 mt-2 bg-base-100 shadow-lg border border-base-300 rounded-md">
              <Calendar bind:value type="single" initialFocus />
              <input type="hidden" name="date" value={dateStr}>
            </div>
          {/if}
        </div>
        <button type="submit" class="btn btn-primary btn-sm">search</button>
        <a type="submit" class="btn btn-secondary btn-sm" href="/trips" data-sveltekit-reload>clear</a>
    </div>


  </form>

  <!-- the list -->
  <div class={"flex flex-col gap-2"}>

    {#each data_.trips as trip }
      <TripCard {trip} />
      
    {/each}

  </div>
</section>
