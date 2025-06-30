<script lang="ts">
	import type { trips } from '$generated/prisma';
    import date from 'date-and-time';
	import CustomeSvg from '../CustomeSVG.svelte';
	import ComboBox from '../ComboBox.svelte';

    interface Props {
        driver_option: App.ComboOption[]
        vehicle_option: App.ComboOption[]
        destination_option: App.ComboOption[]
        form: {[k:string]:any}
        trip: trips
    }

    let {
        driver_option,
        vehicle_option,
        destination_option,
        form,
        trip = $bindable()
    }: Props = $props()

    let today = $derived(() =>
        trip.date instanceof Date ? date.format(trip.date, 'YYYY-MM-DD') : ''
    )

</script>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 flex flex-col gap-3">
    <legend class="fieldset-legend">Details</legend>

    <div class="input-group">
        <label class="floating-label">
            <span>Date</span>
            <button type="button" popovertarget="cally-popover1" 
                class={form?.form?.errors?.date ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }
                id="cally1" style="anchor-name:--cally1"
            >
                {date.format(trip.date, 'YYYY-MM-DD')}
            </button>
            
        </label>
        {#if form?.form?.errors?.date}
            <span class="text-red-600">{form?.form?.errors?.date[0]}</span>
        {/if}

    </div>
    
    
    <div popover id="cally-popover1" class="dropdown bg-base-100 rounded-box shadow-lg" style="position-anchor:--cally1">
        <!-- svelte-ignore event_directive_deprecated -->
        <calendar-date class="cally" on:change={(e: any) => trip.date = new Date(e.target.value)}>
        <CustomeSvg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></CustomeSvg>
        <CustomeSvg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></CustomeSvg>
        <calendar-month></calendar-month>
        </calendar-date>
    </div>

    <div class="w-full">
        <ComboBox placeholder="Driver" items={driver_option} bind:value={trip.driver_id} label={"Driver"} error={form?.form?.errors?.driver_id}  />
    </div>
    <div class="w-full">
        <ComboBox placeholder="Vehicle" items={vehicle_option} bind:value={trip.vehicle_id} label={"Vehicle"} error={form?.form?.errors?.vehicle_id}  />
    </div>
    <div class="join w-full">
        <div class="w-full">
            <ComboBox placeholder="From" items={destination_option} bind:value={trip.start_destination_id} label={"From"}  error={form?.form?.errors?.start_destination_id}  />
        </div>
        <div class="w-full">
            <ComboBox placeholder="To" items={destination_option} bind:value={trip.end_destination_id} label={"To"}  error={form?.form?.errors?.end_destination_id}  />
        </div>

    </div>

    <div class="w-full">
        <label class="floating-label">
            <span>Remark</span>
            <textarea class="textarea w-full border border-base-300" placeholder="Remark" bind:value={trip.remark}></textarea>
        </label>
    </div>

    <div class="w-full flex flex-col gap-3">
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
            <label class="floating-label">
                <span>Trip Number</span>
                <input type="number" placeholder="Trip Number" 
                    class={form?.form?.errors?.trip_number ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }
                    bind:value={trip.trip_number} min={1} max={2}  
                />
            </label>
            {#if form?.form?.errors?.trip_number}
                <span class="text-red-600">{form?.form?.errors?.trip_number[0]}</span>
            {/if}
        {/if}
    </div>

    <button class="btn btn-primary" type="submit">Submit</button>
</fieldset>