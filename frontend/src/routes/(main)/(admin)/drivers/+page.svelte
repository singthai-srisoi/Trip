<script lang="ts">
	import type { users } from '$generated/prisma';
	import { user_role } from '$generated/prisma/enums';
	import DriverForm from "$lib/components/forms/DriverForm.svelte";
	import type { PageData } from './$types';

    interface Props {
        data: PageData
        form: FormData
    }

    let {
        data,
        form
    }: Props = $props();



    let user: users = $state({
        id: 0,
        role: user_role.driver,
        name: '',
        created_at: null,
        phone: '',
    });

</script>
<svelte:head>
    <title>drivers</title>
</svelte:head>

<div class={"mb-6 w-full md:flex items-baseline justify-between"}>
  <div class="flex gap-2">
    <a class="btn btn-ghost btn-sm bg-base-300" href="/drivers/add">Add</a>
  </div>
</div>



<div class="overflow-x-auto rounded-sm border border-base-content/5 bg-base-100">
  <table class="table table-xs">
    <!-- head -->
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {#each data.drivers as driver (driver.id)}
            <tr>
                <th>{driver.name}</th>
                <td>{user.phone == 'null' || user.phone == null ? '' : user.phone}</td>
                <td>
                    <a href={`/drivers/${driver.id}`} class="btn btn-xs btn-outline">Edit</a>
                </td>
                
            </tr>
        {/each}

      



      
    </tbody>
  </table>


</div>

<div class="join w-full justify-center mt-4">
  <button class="join-item btn btn-sm">{'<<'}</button>

  <button class="join-item btn btn-sm">1</button>
  <button class="join-item btn btn-sm">2</button>
  <button class="join-item btn btn-sm btn-disabled">...</button>
  <button class="join-item btn btn-sm">99</button>
  <button class="join-item btn btn-sm">100</button>
  <button class="join-item btn btn-sm">{'>>'}</button>

</div>
