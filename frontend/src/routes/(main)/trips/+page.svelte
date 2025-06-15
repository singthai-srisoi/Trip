<script lang="ts">
  import date from 'date-and-time' 


  let now = new Date()
  let dt = date.format(now, "DD MMM, dddd")
</script>
<svelte:head>
  <title>Trips</title>
</svelte:head>

<div class={"mb-6 w-full md:flex items-baseline justify-between"}>
  <h1 class="text-2xl font-semibold mb-2">{dt}</h1>
  <div class="flex gap-2">
    <a class="btn btn-ghost btn-sm bg-base-300" href="/trips/add">Add</a>
    <a class="btn btn-ghost btn-sm bg-base-300" href="/trips/list">View All</a>
  </div>
  
</div>

<section class="active-trip mb-5">
  <h2 class={"text-xl font-semibold mb-2"}>Active Trip</h2>
  <label class="input w-full  border border-base-300 mb-2 relative">
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