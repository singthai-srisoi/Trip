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

    $inspect(data)
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

{#each data.trips as trip, i}
    <div class="collapse collapse-arrow join-item border-base-300 border">
        <input type="checkbox" name="my-accordion-4" />
        <div class="collapse-title font-semibold flex items-center gap-2">{trip.vehicle.plate_no} <div class="badge badge-xs badge-primary">On Going</div></div>
        <div class="collapse-content text-sm">
            <ul class="timeline w-full">
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
                            <hr class="w-full border m-0" />
                        </li>
                    {:else if n == trip.points.length -1 }
                        <li>
                            <hr class="w-full border m-0" />
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
            <div class="divider"></div>
            <ul class="timeline w-full">
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
                            <hr class="w-full border m-0" />
                        </li>
                    {:else if n == trip.points.length -1 }
                        <li>
                            <hr class="w-full border m-0" />
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
        </div>
    </div>
{/each}