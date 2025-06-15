<svelte:head>
    <title>view all</title>
</svelte:head>

<script lang="ts">

	// import "cally";
    import date from "date-and-time";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";

    interface Props {
        data: {
        } | PageData
    }

    let {
    }: Props = $props()

    onMount(async () => {
        const cally = await import('cally')
    })

    let today = date.format(
        new Date,
        "YYYY-MM-DD"
    )
    let trip = $state({
        from: '',
        to: '',
        date: today,
    })
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
  <table class="table table-zebra">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td><ul class="steps">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Choose plan</li>
</ul>
</td>
        <td>Blue</td>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>