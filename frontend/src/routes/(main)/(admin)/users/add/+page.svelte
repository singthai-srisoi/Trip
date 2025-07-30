<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { users } from '$generated/prisma';
	import { user_role } from '$generated/prisma/enums';
	import UserForm from '$lib/components/forms/UserForm.svelte';
	import type { ActionResult } from '@sveltejs/kit';

    interface Props {
        form: FormData
    }

    let {
        form
    }: Props = $props()


    let user: users = $state({
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
<svelte:head>
    <title>drivers</title>
</svelte:head>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/users">Users</a></li>
    <li>Add</li>
  </ul>
</div>

<form action="?/create" method="POST" {onsubmit}>
    <UserForm 
        bind:user
        {form}
    />
</form>