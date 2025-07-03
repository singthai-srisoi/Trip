<!-- for top tab  -->
<script lang="ts">
	import { page } from "$app/state";
	import type { Snippet } from "svelte";

    interface Props {
        children: Snippet
    }
    let {
        children
    }: Props = $props()
</script>

<div role="tablist" class="tabs tabs-border tabs-xs mb-6">
  <a role="tab" class="tab" href="/drivers"
  class:tab-active={page.route.id?.includes('/drivers')}>
  Drivers</a>
  <a role="tab" class="tab" href="/users"
    class:tab-active={page.route.id?.includes('/users')}>
        Users
    </a>
  <a role="tab" class="tab" href="/vehicles"
    class:tab-active={page.route.id?.includes('/vehicles')}>
        Vehicles
    </a>
    <a role="tab" class="tab" href="/destinations"
    class:tab-active={page.route.id?.includes('/destinations')}>
        Destinations
    </a>
</div>
{@render children()}