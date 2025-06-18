<script lang="ts">
	import type { trips } from '$generated/prisma';
    import date from 'date-and-time';
	import CustomeSvg from '../CustomeSVG.svelte';
	import ComboBox from '../ComboBox.svelte';

    interface Props {
        driver_option: App.ComboOption[]
        vehicle_option: App.ComboOption[]
        destination_option: App.ComboOption[]
        trip: trips
    }

    let {
        driver_option,
        vehicle_option,
        destination_option,
        trip = $bindable()
    }: Props = $props()

    let today = $derived(date.format(
        new Date(trip.date) ?? new Date(),
        "YYYY-MM-DD"
    ))
</script>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
    <legend class="fieldset-legend">Details</legend>

    <button type="button" popovertarget="cally-popover1" class="input input-border border border-base-300 w-full" id="cally1" style="anchor-name:--cally1">
        {today}
    </button>
    <div popover id="cally-popover1" class="dropdown bg-base-100 rounded-box shadow-lg" style="position-anchor:--cally1">
        <!-- svelte-ignore event_directive_deprecated -->
        <calendar-date class="cally" on:change={(e: any) => trip.date = e.target.value}>
        <CustomeSvg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></CustomeSvg>
        <CustomeSvg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></CustomeSvg>
        <calendar-month></calendar-month>
        </calendar-date>
    </div>

    <div class="w-full">
        <ComboBox placeholder="Driver" items={driver_option} bind:value={trip.driver_id}  />
    </div>
    <div class="w-full">
        <ComboBox placeholder="Vehicle" items={vehicle_option} bind:value={trip.vehicle_id}  />
    </div>
    <div class="join w-full">
        <div class="w-full">
            <ComboBox placeholder="From" items={destination_option} bind:value={trip.start_destination_id}  />
        </div>
        <div class="w-full">
            <ComboBox placeholder="To" items={destination_option} bind:value={trip.end_destination_id}  />
        </div>

    </div>

    <div class="w-full">
        <textarea class="textarea w-full border border-base-300" placeholder="Remark" bind:value={trip.remark}></textarea>
    </div>

    <div class="w-full">
        <label class="label">
        <!-- svelte-ignore event_directive_deprecated -->
        <input type="checkbox" bind:checked={trip.is_gantung} class="checkbox !bg-white border border-base-300"
            on:change={(e) => {
            if (e.currentTarget.checked) {
                trip.trip_number = 3
            }
            else {
                trip.trip_number = 1
            }
            }}
        />
        Gantung
        </label>
        {#if !trip.is_gantung}
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Trip Number</legend>
            <input type="number" placeholder="Trip Number" class="input input-border border border-base-300 w-full !bg-white" bind:value={trip.trip_number} min={1} max={2}  />
        </fieldset>
        {/if}
    </div>

    <button class="btn btn-primary" type="submit">Submit</button>
</fieldset>