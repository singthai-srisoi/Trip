<script lang="ts">
  import date from 'date-and-time' 
	import type { Snippet } from 'svelte';
	import '../app.css';
  interface Props {
    children: Snippet
  }


	let { children }: Props = $props();

  let now = new Date()
  let dt = date.format(now, "DD MMM, dddd")
</script>
<svelte:head>
  <title>Home</title>
</svelte:head>
<section class="min-h-screen pb-[80px] overflow-auto relative">
  <main class="p-6 lg:p-25 md:p-10 mt-3">
    <h1 class="text-2xl font-semibold mb-6">{dt}</h1>
    <section class="active-trip mb-5">
      <h2 class={"text-xl font-semibold mb-2"}>Active Trip</h2>
      <label class="input w-full  border border-base-300 mb-2">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" class="grow" placeholder="Search" list="vehicle" />
      </label>
      <datalist id="vehicle">
        <option value="WY098"></option>
        <option value="JHKFDS980"></option>
        <option value="SDJF(*)("></option>
        <option value="sdf*&)*"></option>
        <option value="OHOI293846"></option>
      </datalist>
      <!-- the list -->
      <div class={"flex flex-col gap-2"}>
        <div class="card bg-base-200 border border-base-300 card-sm">
          <div class="card-body">
            <h2 class="card-title">WUY4618 <div aria-label="status" class="status status-success"></div></h2>
            <p>trip 1</p>
            <ul class="steps">
              <li class="step step-info">
                <div class="tooltip tooltip-primary" data-tip="hello">
                  <span>MPOB</span>
                </div>
                 
              </li>
              <li class="step">Benta Sawit</li>
            </ul>
            <div class="justify-end card-actions">
              <button class="btn btn-primary">View</button>
            </div>
          </div>
        </div>

        <div class="card bg-base-200 border border-base-300 card-sm">
          <div class="card-body">
            <h2 class="card-title">WUY4618 <div aria-label="status" class="status status-success"></div></h2>
            <p>trip 1</p>
            <ul class="steps">
              <li class="step step-info">
                <div class="tooltip tooltip-primary" data-tip="hello">
                  <span>MPOB</span>
                </div>
                 
              </li>
              <li class="step">Benta Sawit</li>
            </ul>
            <p>trip 2</p>
            <ul class="steps">
              <li class="step step-secondary">
                <div class="tooltip tooltip-secondary" data-tip="hello">
                  <span>MPOB</span>
                </div>
                 
              </li>
              <li class="step">Benta Sawit</li>
            </ul>
            
            <div class="justify-end card-actions">
              <button class="btn btn-primary">View</button>
            </div>
          </div>
        </div>

        <div class="card bg-base-200 border border-base-300 card-sm">
          <div class="card-body">
            <h2 class="card-title">WUY4618 <div aria-label="status" class="status status-success"></div></h2>
            <ul class="steps">
              <li class="step step-info">
                <div class="tooltip tooltip-primary" data-tip="hello">
                  <span>MPOB</span>
                </div>
                 
              </li>
              <li class="step">Benta Sawit</li>
            </ul>
            <div class="justify-end card-actions">
              <button class="btn btn-primary">View</button>
            </div>
          </div>
        </div>

      </div>
    </section>
    <section class="completed-trip">
      <h2 class={"text-xl font-semibold mb-2"}>Completed Trip</h2>
      
      <!-- the list -->
      <div class={"flex flex-col gap-2"}>
        <div class="collapse collapse-plus bg-base-200 border border-base-300">
        <input type="checkbox" name="my-accordion-3" checked={false} />
        <div class="collapse-title font-semibold">How do I create an account?</div>
        <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
      </div>
      <div class="collapse collapse-plus bg-base-200 border border-base-300">
        <input type="checkbox" name="my-accordion-3" checked={false} />
        <div class="collapse-title font-semibold">How do I create an account?</div>
        <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
      </div>
      <div class="collapse collapse-plus bg-base-200 border border-base-300">
        <input type="checkbox" name="my-accordion-3" checked={false} />
        <div class="collapse-title font-semibold">How do I create an account?</div>
        <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
      </div>

      </div>
    </section>
    {@render children()}
  </main>
  <footer class="footer fixed bottom-0 left-0 z-9999 w-full border-t border-base-300 grid-cols-3 items-center bg-base-200 text-base-content p-4 md:p-10 lg:px-25">
      <a class="btn btn-ghost w-full h-15 inline-flex flex-col items-center justify-center gap-1 font-bold bg-base-300" href="/main">
        {#if false}
          <svg class="w-5 h-5 size-1.5 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 12l8-8 8 8M6 10.5V19a1 1 0 001 1h3v-3a1 1 0 011-1h2a1 1 0 011 1v3h3a1 1 0 001-1v-8.5" />
          </svg>
        {:else}
          <svg class="w-5 h-5 size-1.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
          </svg>
          
        {/if}
        Home
      </a>
      <a class="btn btn-ghost w-full h-15 inline-flex flex-col items-center justify-center gap-1" href="/main">
        {#if true}
          <svg class="w-5 h-5 size-1.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
          </svg>

        {:else}
          <svg class="w-5 h-5 size-1.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z" clip-rule="evenodd"/>
          </svg>

          
        {/if}
        Trip
      </a>
      <a class="btn btn-ghost w-full h-15 inline-flex flex-col items-center justify-center gap-1" href="/main">
        {#if true}
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
        {:else}
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
          </svg>          
        {/if}
        Profile
      </a>
  </footer>

</section>