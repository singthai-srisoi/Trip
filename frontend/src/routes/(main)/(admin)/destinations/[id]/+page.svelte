<svelte:head>
    <title>edit</title>
</svelte:head>

<script lang="ts">
	import type { PageData } from "./$types";
	import type { destinations } from "$generated/prisma";
	import type { ActionResult } from '@sveltejs/kit';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import DestinationForm from "$lib/components/forms/DestinationForm.svelte";


    interface Props {
        data: PageData
        form: { 
          success?: boolean
          message?: string
        }
    }

    let {
      data,
      form
    }: Props = $props()



    let destination: destinations = $state(data?.destination ?? {
        id: 0,
        name: '',
        address: '',
        created_at: new Date(),
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

    let alert: HTMLDivElement | null = $state(null)


</script>

{#if form?.success !== undefined}
<div role="alert" class="alert overflow-auto" bind:this={alert}
  class:alert-success={form.success}
  class:alert-error={!form.success}

>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>{form.message}</span>
  <div>
    <button class="btn btn-sm"
    class:btn-success={form.success}
  class:btn-error={!form.success}
      type="button"
     onclick={() => {
        if (alert) {
          alert.remove();
        }
     }}
    >OK</button>
  </div>
</div>
  
{/if}


<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/destinations">Destination</a></li>
    <li>Edit</li>
  </ul>
</div>

<!-- Form Start -->
<form action="?/edit" method="post" {onsubmit}>
  <DestinationForm
    {form}
    bind:destination
  />
</form>