<script lang="ts">
	import * as Accordion from "$lib/components/ui/accordion";
	import type { ActionData, PageData } from "./$types";
	import ResetPassword from "./ResetPassword.svelte";

    interface Props {
        data: PageData
        form: ActionData
    }

    let {
        data,
        form
    }: Props = $props()

</script>
<svelte:head>
    <title>preferences</title>
</svelte:head>



<h1 class="text-2xl">Preference</h1>
<h2 class="text-lg">{data.user?.username}</h2>


{#if form?.success}
<div role="alert" class="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>{form?.message}</span>
</div>
{/if}
<Accordion.Root type="multiple" class="w-full sm:max-w-[70%]">
    <ResetPassword {form} />
</Accordion.Root>