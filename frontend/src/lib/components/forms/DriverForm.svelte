<script lang="ts">
	import type { users } from '$generated/prisma';
    import date from 'date-and-time';
	import CustomeSvg from '../CustomeSVG.svelte';
	import ComboBox from '../ComboBox.svelte';

    interface Props {
        user: users
        form: {[k:string]:any}
    }

    let {
        user = $bindable(),
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
                    bind:value={user.name}  
                />
            </label>
    </div>

    <div class="w-full">
        <label class="floating-label">
                <span>Phone</span>
                <input type="text" placeholder="Phone" 
                    class={form?.form?.errors?.name ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }
                    bind:value={user.phone}  
                />
            </label>
    </div>

    

    <button class="btn btn-primary" type="submit">Submit</button>
</fieldset>