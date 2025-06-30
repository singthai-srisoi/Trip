<script lang="ts">
  import date from 'date-and-time' 
	import type { PageData } from './$types';
  import type { destinations, trips, vehicles } from '$generated/prisma';
	import TripCard from '$lib/components/TripCard.svelte';

  interface trips_model extends trips {
    vehicles: vehicles
    destinations_trips_end_destination_idTodestinations: destinations
    destinations_trips_start_destination_idTodestinations: destinations
  }
  interface Props {
    data: {
      vehicles: string[]
      trips: Map<string, trips_model[]>
    } | PageData
  }

  let {
    data
  }: Props = $props()


  let now = new Date()
  let dt = date.format(now, "DD MMM, dddd")
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
  <label class="input w-full  border border-base-300 mb-2 relative">
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2.5"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
    <input type="search" class="grow" placeholder="Search" list="vehicle" />
  </label>
  <datalist id="vehicle">
    <!-- <option value="WY098"></option>
    <option value="JHKFDS980"></option>
    <option value="SDJF(*)("></option>
    <option value="sdf*&)*"></option>
    <option value="OHOI293846"></option> -->
    {#each data.vehicles as vehicle}
      <option value={vehicle}></option>
    {/each}
  </datalist>
  <!-- the list -->
  <div class={"flex flex-col gap-2"}>

    {#each data.trips as trip }
      <TripCard {trip} />
      <!-- <div class="card bg-base-200 border border-base-300 card-sm">
        <div class="card-body">
          <h2 class="card-title">
            {trip[0]}
            {#if (trip[1][0] && trip[1][0].is_checked == true && trip[1][0].is_verified==true) &&
              (trip[1][1] && trip[1][1].is_checked == true && trip[1][1].is_verified==true)
            }
              <div aria-label="status" class="status status-success"></div>
            {:else}
              <div aria-label="warning" class="status status-warning"></div>
            {/if}
          </h2>
          {#each trip[1] as t, i}
          <div class={"flex justify-between items-center gap-2"}>
            <p class={"font-bold"}>Trip {i+1}: {t.created_at ? date.format(t.created_at, "DD MMM HH:mm") : ''}</p>
            <a href={`/trips/${t.id}`} class={"btn btn-xs btn-soft btn-accent"}>view</a>
          </div>
            <ul class="steps">
              <li class="step step-info">
                <div class="tooltip tooltip-primary" data-tip="hello">
                  {t.destinations_trips_start_destination_idTodestinations.name}
                </div>
              </li>
              <li class="step step-info">
                <div class="tooltip tooltip-primary" data-tip="hello">
                  {t.destinations_trips_end_destination_idTodestinations.name}
                </div>
              </li>
            </ul>
            {#if trip[1].length > 1 && i < trip[1].length-1}
              <div class="divider my-1"></div>
            {/if}
            
          {/each} -->
          
          <!-- <div class="justify-end card-actions">
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div> -->
      
    {/each}

    <!-- trip card start -->
    <!-- <div class="card bg-base-200 border border-base-300 card-sm">
      <div class="card-body">
        <h2 class="card-title">WUY4618 <div aria-label="status" class="status status-success"></div></h2>
        <p>trip 1</p>
        <ul class="steps">
          <li class="step step-info">
            <div class="tooltip tooltip-primary" data-tip="hello">
              <span>MPOB</span>
            </div>
              
          </li>
          <li class="step">Benta Sawit</li>
        </ul>
        <div class="justify-end card-actions">
          <button class="btn btn-primary">View</button>
        </div>
      </div>
    </div> -->
    <!-- trip card end -->
  </div>
</section>
<section class="completed-trip">
  <h2 class={"text-xl font-semibold mb-2"}>Completed Trip</h2>
  
  <!-- the list -->
  <div class={"flex flex-col gap-2"}>
    <div class="collapse collapse-plus bg-base-200 border border-base-300">
    <input type="checkbox" name="my-accordion-3" checked={false} />
    <div class="collapse-title font-semibold dark:text-white">How do I create an account?</div>
    <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
  </div>
  <div class="collapse collapse-plus bg-base-200 border border-base-300">
    <input type="checkbox" name="my-accordion-3" checked={false} />
    <div class="collapse-title font-semibold">How do I create an account?</div>
    <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
  </div>
  <div class="collapse collapse-plus bg-base-200 border border-base-300">
    <input type="checkbox" name="my-accordion-3" checked={false} />
    <div class="collapse-title font-semibold">How do I create an account?</div>
    <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
  </div>

  </div>
</section>