<svelte:head>
    <title>view all</title>
</svelte:head>

<script lang="ts">
  import date from "date-and-time"
	import type { PageData } from "./$types";
    interface Props {
        data: PageData
    }

    let {
      data
    }: Props = $props()

    let format = (date_: Date) => {
        return date_ ? date.format(date_, "YYYY-MM-DD") : ""
    }

    $inspect(data, 'data')
</script>


<div class={"mb-6 w-full flex items-baseline justify-between"}>
    <h1 class="text-2xl font-semibold">View All Trip</h1>
    <a class="btn btn-ghost btn-sm bg-base-300" href="/trips">Back</a>
</div>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/trips">Trips</a></li>
    <li>View All</li>
  </ul>
</div>

<div class="overflow-x-auto rounded-sm border border-base-content/5 bg-base-100">
  <table class="table table-xs">
    <!-- head -->
    <thead>
      <tr>
        <th>Date</th>
        <th>Lorry</th>
        <th>Trip</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

      {#each data.trips as group}
        {#each group.trips as trip, i}
          <tr>
            {#if i === 0}
              <th rowspan={group.trips.length} class="align-top">{format(group.date)}</th>
              <th rowspan={group.trips.length} class="align-top">{group.plate_no}</th>
            {/if}
            <td class="align-top">
              <div class="breadcrumbs text-xs p-0 align-top">
                <ul>
                  <li>{trip.destinations_trips_start_destination_idTodestinations?.name}</li>
                  <li>{trip.destinations_trips_end_destination_idTodestinations?.name}</li>
                </ul>
              </div>
            </td>
            <td>
              <a href={`/trips/${trip.id}/edit`} class="btn btn-xs btn-outline">Edit</a>
            </td>
          </tr>
        {/each}
      {/each}



      
    </tbody>
  </table>
</div>