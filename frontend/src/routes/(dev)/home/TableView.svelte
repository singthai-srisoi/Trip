<script lang="ts">
	import type { PageData } from "./$types";

    interface Props {
        data: {
            trips: Model.Trip[]
        } | PageData
    }

    let {
        data
    }: Props = $props()

</script>

<div class="overflow-x-auto">
  <table class="table table-zebra">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Vehicle</th>
        <th>Trip</th>
        <th>Check</th>
      </tr>
    </thead>
    <tbody>
        {#each data.trips as trip, i}
            <tr>
                <th>{i + 1}</th>
                <td>{trip.vehicle.plate_no}</td>
                <td>
                    <ul class="timeline">
                        {#each trip.points as point, n}
                            {#if n == 0}
                                <li>
                                    <div class="timeline-start timeline-box">{point.name}</div>
                                    <div class="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            class="h-5 w-5"
                                        >
                                            <path
                                            fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <hr />
                                </li>
                            {:else if n == trip.points.length -1 }
                                <li>
                                    <hr />
                                    <div class="timeline-start timeline-box">{point.name}</div>
                                    <div class="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            class="h-5 w-5"
                                        >
                                            <path
                                            fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </li>
                            {:else}
                             <li>
                                <hr />
                                <div class="timeline-end timeline-box">{point.name}</div>
                                <div class="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="h-5 w-5"
                                    >
                                        <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clip-rule="evenodd"
                                        />
                                    </svg>
                                    </div>
                                <hr />
                            </li>
                            {/if}
                        {/each}
                    </ul>
                </td>
                <td>On Going</td>
            </tr>
        {/each}
    </tbody>
  </table>
</div>