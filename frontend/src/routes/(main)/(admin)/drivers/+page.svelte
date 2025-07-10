<script lang="ts">
	import type { users } from '$generated/prisma';
	import type { ActionData, PageData } from './$types';

    interface Props {
        data: PageData
        form: ActionData
    }

    let {
        data,
        form
    }: Props = $props();

    let showModal = $state(false);
    let deleteUser: users | null = $state(null);

    let currentPage = parseInt(data.page)
    let maxPage = parseInt(data.max_page)
    let paginationPages = () => {
      let pages = []

      if (maxPage <= 5) {
        // Show all pages if 5 or fewer
        for (let i = 1; i <= maxPage; i++) pages.push(i)
      } else {
        if (currentPage <= 3) {
          pages = [1, 2, 3, 4, '...', maxPage]
        } else if (currentPage >= maxPage - 2) {
          pages = [1, '...', maxPage - 3, maxPage - 2, maxPage - 1, maxPage]
        } else {
          pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', maxPage]
        }
      }

      return pages
    }

    // $effect(() => {
    //     if (form?.errors?.id) {
    //         showModal = true;
    //     }
    // });


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
        {#each data.data as driver (driver.id)}
            <tr>
                <th>{driver.name}</th>
                <td>{driver.phone == 'null' || driver.phone == null ? '' : driver.phone}</td>
                <td class="join">
                    <a href={`/drivers/${driver.id}`} class="btn btn-xs btn-outline join-item">Edit</a>
                    <button type="button" class="btn btn-xs btn-outline join-item"
                      onclick={() => {
                        showModal = true;
                        deleteUser = driver;
                      }}
                    >Delete</button>
                </td>
                
            </tr>
        {/each}

      



      
    </tbody>
  </table>


</div>

{#if maxPage > 1}
<div class="join w-full flex justify-center mt-4">
  <!-- Previous button -->
  <a
    class="join-item btn btn-xs"
    href={`?page=${Math.max(currentPage - 1, 1)}`}
    class:btn-disabled={currentPage === 1}
  >
    {'<<'}
  </a>

  <!-- Page buttons -->
  {#each paginationPages() as p}
    {#if p === '...'}
      <button class="join-item btn btn-xs btn-disabled">...</button>
    {:else}
      <a
        href={`?page=${p}`}
        class="join-item btn btn-xs {currentPage === p ? 'btn-active' : ''}"
      >
        {p}
      </a>
    {/if}
  {/each}

  <!-- Next button -->
  <a
    class="join-item btn btn-xs"
    href={`?page=${Math.min(currentPage + 1, maxPage)}`}
    class:btn-disabled={currentPage === maxPage}
  >
    {'>>'}
  </a>
</div>
{/if}

<!-- <div class="join w-full flex justify-center mt-4">
  <button class="join-item btn btn-sm">{'<<'}</button>

  <button class="join-item btn btn-sm">1</button>
  <button class="join-item btn btn-sm">2</button>
  <button class="join-item btn btn-sm btn-disabled">...</button>
  <button class="join-item btn btn-sm">99</button>
  <button class="join-item btn btn-sm">100</button>
  <button class="join-item btn btn-sm">{'>>'}</button>

</div> -->

{#if showModal}
<dialog id="my_modal_1" class="modal p-0" open>
  <div class="modal-box">
    <h3 class="text-lg font-bold">Are you sure you want to delete: {deleteUser?.name}</h3>
    <div class="modal-action">

      <form action="?/delete" method="post">
        <input type="hidden" name="id" value={deleteUser?.id} />
        <button class="btn btn-error"
            type="submit"
          >Delete</button>
      </form>
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-warning"
          onclick={() => {
            showModal = false;
            deleteUser = null;
          }}
        >Close</button>
      </form>
    </div>
  </div>
</dialog>
  
{/if}
