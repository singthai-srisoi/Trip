<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { destinations } from '$generated/prisma';
	import DestinationForm from '$lib/components/forms/DestinationForm.svelte';
	import type { ActionResult } from '@sveltejs/kit';

    interface Props {
        form: FormData
    }

    let {
        form
    }: Props = $props()


    let destination: destinations = $state({
        id: 0,
        name: '',
        address: '',
        created_at: null
    })
    

    async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
      event.preventDefault();
      const data = new FormData()

      for (const k of Object.keys(destination) as (keyof typeof destination)[]) {
        let value = destination[k]
        data.append(k, String(destination[k]))
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
    <li><a href="/destinarions">Destinations</a></li>
    <li>Add</li>
  </ul>
</div>

<form action="?/create" method="POST" {onsubmit}>
    <DestinationForm 
        bind:destination
        {form}
    />
</form>