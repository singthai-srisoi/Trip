<script lang="ts">
	import type { destinations } from '$generated/prisma';
	import type { PageData } from './$types';

    interface Props {
        data: PageData
        form: { 
          success?: boolean
          message?: string
        }
    }

    let {
        data,
        form
    }: Props = $props();

    let showModal = $state(false);
    let deleteDestination: destinations | null = $state(null);

    let alert: HTMLDivElement | null = $state(null)
    
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

</script>
<svelte:head>
    <title>destinations</title>
</svelte:head>

<div class={"mb-6 w-full md:flex items-baseline justify-between"}>
  <div class="flex gap-2">
    <a class="btn btn-ghost btn-sm bg-base-300" href="/destinations/add">Add</a>
  </div>
</div>

{#if form?.success !== undefined}
<div role="alert" class="alert overflow-auto" bind:this={alert}
  class:alert-success={form.success}
  class:alert-error={!form.success}

>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>{form.message}</span>
  <div>
    <button class="btn btn-sm"
    class:btn-success={form.success}
  class:btn-error={!form.success}
      type="button"
     onclick={() => {
        if (alert) {
          alert.remove();
        }
     }}
    >OK</button>
  </div>
</div>
  
{/if}



<div class="overflow-x-auto rounded-sm border border-base-content/5 bg-base-100">
  <table class="table table-xs">
    <!-- head -->
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {#each data.data as destination (destination.id)}
            <tr>
                <th>{destination.name}</th>
                <td>{destination.address == 'null' || destination.address == null ? '' : destination.address}</td>
                <td class="join">
                    <a href={`/destinations/${destination.id}`} class="btn btn-xs btn-outline join-item">Edit</a>
                    <button type="button" class="btn btn-xs btn-outline join-item"
                      onclick={() => {
                        showModal = true;
                        deleteDestination = destination;
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
    <h3 class="text-lg font-bold">Are you sure you want to delete: {deleteDestination?.name}</h3>
    <div class="modal-action">

      <form action="?/delete" method="post">
        <input type="hidden" name="id" value={deleteDestination?.id} />
        <button class="btn btn-error"
            type="submit"
          >Delete</button>
      </form>
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-warning"
          onclick={() => {
            showModal = false;
            deleteDestination = null;
          }}
        >Close</button>
      </form>
    </div>
  </div>
</dialog>
  
{/if}
