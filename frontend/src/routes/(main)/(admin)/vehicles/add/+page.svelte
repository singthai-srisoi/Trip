<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { vehicles } from '$generated/prisma';
	import VehicleForm from '$lib/components/forms/VehicleForm.svelte';
	import type { ActionResult } from '@sveltejs/kit';

    interface Props {
        form: FormData
    }

    let {
        form
    }: Props = $props()


    let vehicle: vehicles = $state({
        id: 0,
        plate_no: '',
        model: '',
        created_at: null,
    })
    

    async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
      event.preventDefault();
      const data = new FormData()

      for (const k of Object.keys(vehicle) as (keyof typeof vehicle)[]) {
        let value = vehicle[k]
        data.append(k, String(vehicle[k]))
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
</script>
<svelte:head>
    <title>drivers</title>
</svelte:head>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/vehicles">Vehicles</a></li>
    <li>Add</li>
  </ul>
</div>

<form action="?/create" method="POST" {onsubmit}>
    <VehicleForm 
        bind:vehicle
        {form}
    />
</form>