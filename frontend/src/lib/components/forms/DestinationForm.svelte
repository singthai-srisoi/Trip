<script lang="ts">
	import type { destinations } from '$generated/prisma';

    interface Props {
        destination: destinations
        form: {[k:string]:any}
    }

    let {
        destination = $bindable(),
        form
    }: Props = $props()



</script>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 flex flex-col gap-3">
    <legend class="fieldset-legend">Details</legend>

    <div class="w-full">
        <label class="floating-label">
                <span>Name</span>
                <input type="text" placeholder="Name" 
                    class={form?.form?.errors?.name ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }
                    bind:value={destination.name}  
                />
            </label>
    </div>

    <div class="w-full">
        <label class="floating-label">
                <span>Address</span>
                <input type="text" placeholder="Address" 
                    class={form?.form?.errors?.address ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }
                    bind:value={destination.address}  
                />
            </label>
    </div>

    

    <button class="btn btn-primary" type="submit">Submit</button>
</fieldset>