<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	// import { Prisma } from "$generated/prisma";
    import date from "date-and-time";


    // type trips_model = Prisma.tripsGetPayload<{
    //     include: {
    //         vehicles: true,
    //         destinations_trips_end_destination_idTodestinations: true,
    //         destinations_trips_start_destination_idTodestinations: true,
    //         trip_chats: true
    //     }
    // }>

    interface Props {
        data: LayoutData
        children: Snippet
    }

    let { 
        data,
        children 
    }: Props = $props();
</script>

<div class="py-4">
    <h1 class="text-2xl font-semibold mb-1">{data.trips?.vehicles?.plate_no}</h1>
    
    <div class="flex flex-col">
        <div class="flex gap-2 mb-3">
            <a class="btn btn-ghost btn-sm bg-base-300" href={`/trips/${data.trips?.id}/chat`}>Chat</a>
            <a class="btn btn-ghost btn-sm bg-base-300" href={`/trips/${data.trips?.id}/edit`}>Edit</a>
        </div>
      <span class="text-sm">{data.trips?.date ? date.format(data.trips?.date, "YYYY-MM-DD") : ""}</span>
      <div class="breadcrumbs text-sm p-0">
        <ul>
          {#if data.trips?.is_gantung}
            <li>Gantung</li>
          {:else}
            <li>Trip {data.trips?.trip_number}</li>
          {/if}
          <li>{data.trips?.destinations_trips_end_destination_idTodestinations?.name}</li>
          <li>{data.trips?.destinations_trips_start_destination_idTodestinations?.name}</li>
        </ul>
      </div>
    </div>
  </div>
{@render children()}
