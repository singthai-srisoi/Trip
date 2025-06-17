<svelte:head>
    <title>add</title>
</svelte:head>

<script lang="ts">
  import date from "date-and-time";
	import type { PageData } from "./$types";
	import CustomeSvg from "$lib/components/CustomeSVG.svelte";
	import { onMount } from "svelte";
	import type { destinations, vehicles } from "$generated/prisma";

  import CheckIcon from "@lucide/svelte/icons/check";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";

    interface Props {
        data: {
          vehicles: vehicles[]
          destinations: destinations[]
        } | PageData
    }

    let {
      data
    }: Props = $props()

    onMount(async () => {
        const cally = await import('cally')
    })

    let vehicle_option = data.vehicles.map((v: vehicles) => ({
      value: v.id,
      label: v.plate_no
    }))

    let today = date.format(
        new Date,
        "YYYY-MM-DD"
    )
    let trip = $state({
        from: '',
        to: '',
        date: today,
    })
    const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit"
    },
    {
      value: "next.js",
      label: "Next.js"
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js"
    },
    {
      value: "remix",
      label: "Remix"
    },
    {
      value: "astro",
      label: "Astro"
    }
  ];
 
  let open = $state(false);
  let value = $state("");
  let triggerRef = $state<HTMLButtonElement>(null!);
 
  const selectedValue = $derived(
    frameworks.find((f) => f.value === value)?.label
  );
 
  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>


<div class={"mb-6 w-full flex items-baseline justify-between"}>
    <h1 class="text-2xl font-semibold">Add Trip</h1>
    <a class="btn btn-ghost btn-sm bg-base-300" href="/trips">Back</a>
</div>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/trips">Trips</a></li>
    <li>Add</li>
  </ul>
</div>


<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend class="fieldset-legend">Details</legend>

<button popovertarget="cally-popover1" class="input input-border w-full" id="cally1" style="anchor-name:--cally1">
  {trip.date}
</button>
<div popover id="cally-popover1" class="dropdown bg-base-100 rounded-box shadow-lg" style="position-anchor:--cally1">
  <!-- svelte-ignore event_directive_deprecated -->
  <calendar-date class="cally" on:change={(e: any) => trip.date = e.target.value}>
    <CustomeSvg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></CustomeSvg>
    <CustomeSvg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></CustomeSvg>
    <calendar-month></calendar-month>
  </calendar-date>
</div>

<input type="text" class="input w-full" placeholder="Vehicle" list="vehicles" />
    <datalist id="vehicles">
      {#each data.vehicles as vehicle}
        <option value={vehicle.plate_no}></option>
      {/each}
    </datalist>
  <div class="input p-0 w-full">

  <Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        class="w-[200px] justify-between"
        role="combobox"
        aria-expanded={open}
      >
        {selectedValue || "Select a framework..."}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search framework..." />
      <Command.List>
        <Command.Empty>No framework found.</Command.Empty>
        <Command.Group value="frameworks">
          {#each frameworks as framework (framework.value)}
            <Command.Item
              value={framework.value}
              onSelect={() => {
                value = framework.value;
                closeAndFocusTrigger();
              }}
            >
              <CheckIcon
                class={cn(value !== framework.value && "text-transparent")}
              />
              {framework.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
    
</div>
<div class="join w-full">
    <input type="text" class="input" placeholder="From" list="browsers" />
    <datalist id="browsers">
    <option value="Chrome"></option>
    <option value="Firefox"></option>
    <option value="Safari"></option>
    <option value="Opera"></option>
    <option value="Edge"></option>
    </datalist>



    <input type="text" class="input" placeholder="To" list="browsers_to" />
    <datalist id="browsers_to">
    <option value="Chrome"></option>
    <option value="Firefox"></option>
    <option value="Safari"></option>
    <option value="Opera"></option>
    <option value="Edge"></option>
    </datalist>

</div>

 <button class="btn btn-primary">Add</button>
</fieldset>