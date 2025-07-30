<script lang="ts">
    import type { ActionData } from './$types';
    interface Props {
        form: ActionData
    }

    let {
        form
    }: Props = $props()
</script>
<div class="w-full min-h-[100dvh] flex items-center justify-center">

<form action="?/login" method="post">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">Login</legend>

    <div class="w-full">
            <label class="floating-label">
                    <span>Username</span>
                    <input type="text" placeholder="Username" name="username"
                        class={form?.form?.errors?.username ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }
                    />
                    {#if form?.form?.errors?.username}
                    <div role="alert" class="alert alert-error alert-soft">
                        <span>{form?.form?.errors?.username}</span>
                    </div>
                    {/if}
                </label>
        </div>


    <div class="w-full">
            <label class="floating-label">
                    <span>Password</span>
                    <input type="password" placeholder="Password" name="password"
                        class={form?.form?.errors?.password ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }

                    />
                    {#if form?.form?.errors?.password}
                    <div role="alert" class="alert alert-error alert-soft">
                        <span>{form?.form?.errors?.password}</span>
                    </div>
                    {/if}
                </label>
        </div>


    <button type="submit" class="btn btn-neutral mt-4">Login</button>
    </fieldset>
</form>

</div>