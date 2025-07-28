<svelte:head>
    <title>view all</title>
</svelte:head>

<script lang="ts">
  import date from "date-and-time"
	import type { PageData } from "./$types";
	import { Calendar } from "$lib/components/ui/calendar";
	import type { DateValue } from "@internationalized/date";
	import { clickOutside } from "$lib/directive/clickOutside.svelte";
    interface Props {
        data: PageData
    }

    let {
      data
    }: Props = $props()

    let format = (date_: Date) => {
        return date_ ? date.format(date_, "YYYY-MM-DD") : ""
    }

    $inspect(data.data)

    let currentPage = parseInt(data.page)
    let maxPage = parseInt(data.max_page)
    let paginationPages = () => {
      let pages = []

      if (maxPage <= 5) {
        // Show all pages if 5 or fewer
        for (let i = 1; i <= maxPage; i++) pages.push(i)
      } else {
        if (currentPage <= 3) {
          pages = [1, 2, 3, 4, '...', maxPage]
        } else if (currentPage >= maxPage - 2) {
          pages = [1, '...', maxPage - 3, maxPage - 2, maxPage - 1, maxPage]
        } else {
          pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', maxPage]
        }
      }

      return pages
    }

    $effect(() => {
      if (value) {
        showCalendar = false
      }
    })

    let searchStr = $state('')
    let value = $state<DateValue>();
    let dateStr = $derived(`${value?.year}-${value?.month}-${value?.day}`)
    let showCalendar = $state(false);
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



    
<label class="floating-label flex-grow mb-1">
    <span>Search</span>
    <input class="input input-border input-sm border border-base-300 w-full grow" name="search" placeholder="Search" 
      bind:value={searchStr}
    />
</label>

<div class="w-full mb-2 flex justify-start items-center gap-2">

<div class="relative">
  <button type="button" class="btn btn-ghost btn-sm bg-base-300" onclick={() => showCalendar = !showCalendar} >
    {value ? dateStr : 'Select Date'}
  </button>

  {#if showCalendar}
    <div class="absolute z-50 mt-2 bg-base-100 shadow-lg border border-base-300 rounded-md">
      <Calendar bind:value type="single" initialFocus onchange={() => showCalendar = false} />
      
    </div>
  {/if}
  <input type="hidden" name="date" value={dateStr}>
</div>
<a class="btn btn-primary btn-sm" href={`/trips/list?search=${searchStr}&date=${value?dateStr:''}`} data-sveltekit-reload>search</a>
<a class="btn btn-secondary btn-sm" href="/trips/list" data-sveltekit-reload>clear</a>
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

      {#each data.data as group}
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

{#if maxPage > 1}
<div class="join w-full flex justify-center mt-4">
  <!-- Previous button -->
  <a
    class="join-item btn btn-xs"
    href={`?page=${Math.max(currentPage - 1, 1)}`}
    class:btn-disabled={currentPage === 1}
  >
    {'<<'}
  </a>

  <!-- Page buttons -->
  {#each paginationPages() as p}
    {#if p === '...'}
      <button class="join-item btn btn-xs btn-disabled">...</button>
    {:else}
      <a
        href={`?page=${p}`}
        class="join-item btn btn-xs {currentPage === p ? 'btn-active' : ''}"
      >
        {p}
      </a>
    {/if}
  {/each}

  <!-- Next button -->
  <a
    class="join-item btn btn-xs"
    href={`?page=${Math.min(currentPage + 1, maxPage)}`}
    class:btn-disabled={currentPage === maxPage}
  >
    {'>>'}
  </a>
</div>
{/if}