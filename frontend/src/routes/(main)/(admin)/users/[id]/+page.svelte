<svelte:head>
    <title>edit</title>
</svelte:head>

<script lang="ts">
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import type { users } from "$generated/prisma";
	import type { ActionResult } from '@sveltejs/kit';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { user_role } from '$generated/prisma/enums';
	import DriverForm from '$lib/components/forms/DriverForm.svelte';
	import UserForm from "$lib/components/forms/UserForm.svelte";


    interface Props {
        data: {
          driver: users
        } | PageData
        form: FormData
    }

    let {
      data,
      form
    }: Props = $props()


    onMount(async () => {
        const cally = await import('cally')
    })



    let user: users = $state(data.driver ?? {
        id: 0,
        role: user_role.driver,
        name: '',
        created_at: null,
        phone: '',
        username: '',
        hashed_password: '',
        email: '',
    })

    async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
      event.preventDefault();
      const data = new FormData()

      for (const k of Object.keys(user) as (keyof typeof user)[]) {
        let value = user[k]
        data.append(k, String(user[k]))
      }

      const response = await fetch(event.currentTarget.action, {
        method: 'POST',
        body: data
      });

      const result: ActionResult = deserialize(await response.text());

      if (result.type === 'success') {
        // rerun all `load` functions, following the successful update
        await invalidateAll();
      }

      applyAction(result);
    }
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/users">Users</a></li>
    <li>Edit</li>
  </ul>
</div>

<!-- Form Start -->
<form action="?/edit" method="post" {onsubmit}>
  <UserForm
    {form}
    bind:user
  />
</form>