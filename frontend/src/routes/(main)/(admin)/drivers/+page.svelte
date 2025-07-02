<script lang="ts">
	import type { users } from '$generated/prisma';
	import { user_role } from '$generated/prisma/enums';
	import DriverForm from "$lib/components/forms/DriverForm.svelte";

    interface Props {
        form: FormData
    }

    let {
        form
    }: Props = $props();



    let user: users = $state({
        id: 0,
        role: user_role.driver,
        name: '',
        created_at: null,
        phone: '',
    });

    $inspect(user, 'user');

</script>
<svelte:head>
    <title>drivers</title>
</svelte:head>

<div class={"mb-6 w-full md:flex items-baseline justify-between"}>
  <div class="flex gap-2">
    <a class="btn btn-ghost btn-sm bg-base-300" href="/drivers/add">Add</a>
  </div>
</div>
