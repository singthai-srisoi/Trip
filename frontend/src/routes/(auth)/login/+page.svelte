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
                    <span>Email</span>
                    <input type="text" placeholder="Email" 
                        class={form?.form?.errors?.email ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }

                    />
                </label>
        </div>


    <div class="w-full">
            <label class="floating-label">
                    <span>Password</span>
                    <input type="password" placeholder="Password" 
                        class={form?.form?.errors?.password ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }

                    />
                </label>
        </div>


    <button type="submit" class="btn btn-neutral mt-4">Login</button>
    </fieldset>
</form>

</div>