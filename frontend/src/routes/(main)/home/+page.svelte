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
    let action_modal: HTMLDialogElement
    let editing = $state(0)
    let show_action_modal = (d: number) => {
        editing = d
        action_modal.showModal()
    }
</script>


<div class="flex flex-col gap-1.5">
{#each data.trips as trip, i}
    <div class="collapse collapse-arrow join-item border-base-300 border">
        <input type="checkbox" name="my-accordion-4" />
        <div class="collapse-title font-semibold flex items-center gap-2">{trip.vehicle.plate_no} <div class="badge badge-xs badge-primary">On Going</div></div>
        <div class="collapse-content text-sm">
            <div class="flex items-center justify-between px-2">
                <ul class="timeline timeline-vertical">
                    {#each trip.points as point, n}
                        {#if n == 0}
                            <li>
                                <div class="timeline-start">{point.name}</div>
                                <div class="timeline-end timeline-box">{point.name}</div>
                                <div class="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="h-5 w-5 text-primary"
                                    >
                                        <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <hr class="w-full border m-0 bg-primary" />
                            </li>
                        {:else if n == trip.points.length -1 }
                            <li>
                                <hr class="w-full border m-0" />
                                <div class="timeline-start">{point.name}</div>
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
                    <!-- <li>
                        <div class="timeline-middle badge badge-success badge-xs">Success</div>
                    </li> -->
                </ul>
                <div class="flex flex-col justify-between items-center gap-2 relative">
                    <div class="timeline-middle badge badge-success badge-xs w-full">Success</div>
                    <button class="btn btn-accent btn-soft" onclick={() => show_action_modal(trip.id)}>open modal</button>
                </div>

                
            </div>
            
        </div>
    </div>
{/each}
</div>



<dialog id="my_modal_2" class="modal" bind:this={action_modal}>
  <div class="modal-box">
    <!-- ! Actions Here!! -->
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">{editing}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>