<script lang="ts">
	import { clickOutside } from '$lib/directive/clickOutside.svelte';
  import date from 'date-and-time' 
	import type { PageData } from './$types';
  import type { destinations, trips, vehicles } from '$generated/prisma';
	import TripCard from '$lib/components/TripCard.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { applyAction, deserialize } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
  import {
    type DateValue,
  } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

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
  $inspect(data_)


  let now = data.date || new Date()
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
  let showCalendar = $state(false);

  let showCalendarH1 = $state(false);
  let valueH1 = $state<DateValue>();
  let dateStrH1 = $derived(`${valueH1?.year}-${valueH1?.month}-${valueH1?.day}`)

  $effect(() => {
    if (value) {
      showCalendar = false
    }

    if (valueH1) {
      showCalendarH1 = false
      goto(`/trips?date=${dateStrH1}`, {
        replaceState: true,
        invalidateAll: true
      });
    }
  })
</script>
<svelte:head>
  <title>Trips</title>
</svelte:head>

<div class={"mb-6 w-full md:flex items-baseline justify-between"}>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="relative" onclick={() => showCalendarH1 = true} use:clickOutside={() => showCalendarH1 = false}>
    <h1 class="text-2xl font-semibold mb-2">{dt}</h1>

    {#if showCalendarH1}
      <div class="absolute z-50 mt-2 bg-base-100 shadow-lg border border-base-300 rounded-md">
        <Calendar bind:value={valueH1} type="single" initialFocus />
        
      </div>
    {/if}
  </div>
  
  
  <div class="flex gap-2">
    {#if data.user?.role === 'admin'}
      <a class="btn btn-ghost btn-sm bg-base-300" href="/trips/add">Add</a>
    {/if}
    
    
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

        <div class="relative" use:clickOutside={() => showCalendar = false}>
          <button type="button" class="btn btn-ghost btn-sm bg-base-300" onclick={() => showCalendar = !showCalendar}>
            {value ? dateStr : 'Select Date'}
          </button>

          {#if showCalendar}
            <div class="absolute z-50 mt-2 bg-base-100 shadow-lg border border-base-300 rounded-md">
              <Calendar bind:value type="single" initialFocus onchange={() => showCalendar = false} />
            </div>
          {/if}
          <input type="hidden" name="date" value={dateStr}>
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
