<script lang="ts">
	import date from 'date-and-time';
    import type { destinations, trips, vehicles } from '$generated/prisma';

    interface trips_model extends trips {
        vehicles: vehicles
        destinations_trips_end_destination_idTodestinations: destinations
        destinations_trips_start_destination_idTodestinations: destinations
    }
    interface Props {
        trip: [string, trips_model[]]
    }
    let {
        trip
    }: Props = $props()

    let get_step_color = (is_checked: boolean | null, is_verified: boolean | null, is_gantung: boolean | null) => {
        if (is_gantung) {
            return " step-primary"
        }
        if (is_checked && is_verified) {
            return "step-success"
        } else if (is_checked && !is_verified) {
            return "step-warning"
        } else {
            return "step-error"
        }
    }
</script>

<div class="card bg-base-200 border border-base-300 card-sm">
    <div class="card-body">
        <h2 class="card-title">
        {trip[0]}
        {#if trip[1].length > 0 && trip[1].filter(t => !t.is_gantung).every(t => t.is_checked && t.is_verified)}
            <div aria-label="status" class="status status-success"></div>
        {:else}
            <div aria-label="warning" class="status status-warning"></div>
        {/if}
        </h2>
        {#each trip[1] as t, i}
            <div class={"flex justify-between items-center gap-2"}>
                <p class={"font-bold"}>Trip {i < 2 ? i+1 : 'Gantung'}: {t.created_at ? date.format(t.created_at, "DD MMM HH:mm") : ''}</p>
                <a href={`/trips/${t.id}/chat`} class={"btn btn-xs btn-soft btn-accent"}>view</a>
            </div>
            <ul class="steps">
                <li class={`step step-info ${get_step_color(t.is_checked, t.is_verified, t.is_gantung)}`}>
                <div class="tooltip tooltip-primary" data-tip="hello">
                    {t.destinations_trips_start_destination_idTodestinations.name}
                </div>
                </li>
                <li class={`step step-info ${get_step_color(t.is_checked, t.is_verified, t.is_gantung)}`}>
                <div class="tooltip tooltip-primary" data-tip="hello">
                    {t.destinations_trips_end_destination_idTodestinations.name}
                </div>
                </li>
            </ul>
        {#if trip[1].length > 1 && i < trip[1].length-1}
            <div class="divider my-1"></div>
        {/if}
        
        {/each}
        
        <!-- <div class="justify-end card-actions">
        <button class="btn btn-primary">View</button>
        </div> -->
    </div>
</div>