<script lang="ts">
	import type { vehicles } from '$generated/prisma';

    interface Props {
        vehicle: vehicles
        form: {[k:string]:any}
    }

    let {
        vehicle = $bindable(),
        form
    }: Props = $props()



</script>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 flex flex-col gap-3">
    <legend class="fieldset-legend">Details</legend>

    <div class="w-full">
        <label class="floating-label">
                <span>Plate No.</span>
                <input type="text" placeholder="Plate No." 
                    class={form?.form?.errors?.plate_no ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }
                    bind:value={vehicle.plate_no}  
                />
            </label>
    </div>

    <div class="w-full">
        <label class="floating-label">
                <span>Model</span>
                <input type="text" placeholder="Model" 
                    class={form?.form?.errors?.model ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }
                    bind:value={vehicle.model}  
                />
            </label>
    </div>

    

    <button class="btn btn-primary" type="submit">Submit</button>
</fieldset>