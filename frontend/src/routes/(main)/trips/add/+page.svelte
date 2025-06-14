<svelte:head>
    <title>add</title>
</svelte:head>

<script lang="ts">

	import { fly } from "svelte/transition";
	import type { PageData } from "./$types";

    interface Props {
        data: {
        } | PageData
    }

    let {
    }: Props = $props()
</script>


<div class={"mb-6 w-full flex items-baseline justify-between"}>
    <h1 class="text-2xl font-semibold">Add Trip</h1>
    <a class="btn btn-ghost btn-sm" href="/trips">Back</a>
</div>

