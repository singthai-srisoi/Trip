<script lang="ts">
	import type { users } from '$generated/prisma';
    import date from 'date-and-time';
	import CustomeSvg from '../CustomeSVG.svelte';
	import ComboBox from '../ComboBox.svelte';
	import { user_role } from '$generated/prisma/enums';

    interface Props {
        user: users
        form: {[k:string]:any}
    }

    let {
        user = $bindable(),
        form
    }: Props = $props()

    let options = [
      {
        label: 'Driver',
        value: user_role.driver
      },
      {
        label: 'Admin',
        value: user_role.admin
      },
      {
        label: 'Director',
        value: user_role.director
      }
    ]



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

    <div class="w-full">
        <ComboBox placeholder="Role" items={options} bind:value={user.role} label={"Role"} error={form?.form?.errors?.role}  />
    </div>

    

    <button class="btn btn-primary" type="submit">Submit</button>
</fieldset>