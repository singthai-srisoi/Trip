<script lang="ts">
	import type { vehicles } from '$generated/prisma';
	import type { PageData } from './$types';

    interface Props {
        data: PageData
        form: FormData
    }

    let {
        data,
        form
    }: Props = $props();

    let showModal = $state(false);
    let deleteVehicle: vehicles | null = $state(null);


</script>
<svelte:head>
    <title>vehicles</title>
</svelte:head>

<div class={"mb-6 w-full md:flex items-baseline justify-between"}>
  <div class="flex gap-2">
    <a class="btn btn-ghost btn-sm bg-base-300" href="/vehicles/add">Add</a>
  </div>
</div>



<div class="overflow-x-auto rounded-sm border border-base-content/5 bg-base-100">
  <table class="table table-xs">
    <!-- head -->
    <thead>
      <tr>
        <th>Plate No</th>
        <th>Model</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {#each data.vehicles as vehicle (vehicle.id)}
            <tr>
                <th>{vehicle.plate_no}</th>
                <td>{vehicle.model == 'null' || vehicle.model == null ? '' : vehicle.model}</td>
                <td class="join">
                    <a href={`/vehicles/${vehicle.id}`} class="btn btn-xs btn-outline join-item">Edit</a>
                    <button type="button" class="btn btn-xs btn-outline join-item"
                      onclick={() => {
                        showModal = true;
                        deleteVehicle = vehicle;
                      }}
                    >Delete</button>
                </td>
                
            </tr>
        {/each}

      



      
    </tbody>
  </table>


</div>

<div class="join w-full flex justify-center mt-4">
  <button class="join-item btn btn-sm">{'<<'}</button>

  <button class="join-item btn btn-sm">1</button>
  <button class="join-item btn btn-sm">2</button>
  <button class="join-item btn btn-sm btn-disabled">...</button>
  <button class="join-item btn btn-sm">99</button>
  <button class="join-item btn btn-sm">100</button>
  <button class="join-item btn btn-sm">{'>>'}</button>

</div>

{#if showModal}
<dialog id="my_modal_1" class="modal p-0" open>
  <div class="modal-box">
    <h3 class="text-lg font-bold">Are you sure you want to delete: {deleteVehicle?.plate_no}</h3>
    <div class="modal-action">

      <form action="?/delete" method="post">
        <input type="hidden" name="id" value={deleteVehicle?.id} />
        <button class="btn btn-error"
            type="submit"
          >Delete</button>
      </form>
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-warning"
          onclick={() => {
            showModal = false;
            deleteVehicle = null;
          }}
        >Close</button>
      </form>
    </div>
  </div>
</dialog>
  
{/if}
