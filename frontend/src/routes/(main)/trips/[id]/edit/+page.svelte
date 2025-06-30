<svelte:head>
    <title>add</title>
</svelte:head>

<script lang="ts">
  import date from "date-and-time";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import type { destinations, trips, users, vehicles } from "$generated/prisma";
	import TripForm from '$lib/components/forms/TripForm.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';


    interface Props {
        data: {
          drivers: users[]
          vehicles: vehicles[]
          destinations: destinations[]
          data: PageData
        } | PageData
        form: FormData
    }

    let {
      data,
      form
    }: Props = $props()


    onMount(async () => {
        const cally = await import('cally')
    })

    let vehicle_option = data.vehicles.map((v: vehicles) => ({
      value: String(v.id),
      label: String(v.plate_no)
    }))
    let destination_option = data.destinations.map((d: destinations) => ({
      value: String(d.id),
      label: String(d.name)
    }))
    let driver_option = data.drivers.map((d: users) => ({
      value: String(d.id),
      label: String(d.name)
    }))

    let trip: trips = $state(data.data?.trips ?? {
      id: 0,
      vehicle_id: 0,
      driver_id: 0,
      date: new Date(),
      trip_number: 1,
      remark: '',
      start_destination_id: 0,
      end_destination_id: 0,
      is_gantung: false,
      is_checked: false,
      is_verified: false,
      is_double_checked: false,
      is_incomplete: false,
      created_by: 0,
      created_at: new Date(),
      updated_at: new Date(),
    })

    async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
      event.preventDefault();
      const data = new FormData()

      for (const k of Object.keys(trip) as (keyof typeof trip)[]) {
        let value = trip[k]
        if (value instanceof Date) {
          value = date.format(value, "YYYY-MM-DD")
          // "YYYY-MM-DD"
        }
        data.append(k, String(trip[k]))
      }

      const response = await fetch(event.currentTarget.action, {
        method: 'POST',
        body: data
      });

      const result: ActionResult = deserialize(await response.text());

      if (result.type === 'success') {
        // rerun all `load` functions, following the successful update
        await invalidateAll();
      }

      applyAction(result);
    }

    $inspect(trip)
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/trips">Trips</a></li>
    <li>Edit</li>
  </ul>
</div>

<!-- Form Start -->
<form action="?/edit" method="post" onsubmit={handleSubmit}>
  <TripForm 
    {vehicle_option}
    {driver_option}
    {destination_option}
    {form}
    bind:trip
  />
</form>