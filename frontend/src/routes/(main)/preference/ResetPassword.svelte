<script lang="ts">
	import { enhance } from "$app/forms";

    // import type { ActionData } from './preference/$types';
	import * as Accordion from "$lib/components/ui/accordion";
	import type { ActionData } from "./$types";
    interface Props {
        form: ActionData
    }
    let {
        form
    }: Props = $props()

    let new_pwd = $state('')
    let confirm_pwd = $state('')
    let identical = $derived(new_pwd === confirm_pwd)
</script>

<Accordion.Item value="item-1">
    <Accordion.Trigger>Reset Password</Accordion.Trigger>
    <Accordion.Content class="flex flex-col justify-center items-center gap-4 text-balance">
      <fieldset class="fieldset bg-base-200 border-base-300 w-full rounded-box border p-4">
        <form action="?/reset_password" method="post" use:enhance>
        <legend class="fieldset-legend">Reset Password</legend>

        <div class="w-full">
            <label class="floating-label">
                <span>Old Password</span>
                <input type="text" placeholder="Old Password" name="old_password"
                    class={form?.form?.errors?.old_password ? "input input-error border w-full" : "input input-border border border-base-300 w-full" } 
                />
                {#if form?.form?.errors?.old_password}
                <div role="alert" class="alert alert-error alert-soft">
                    <span>{form?.form?.errors?.old_password}</span>
                </div>
                {/if}
            </label>
        </div>

        <div class="w-full">
            <label class="floating-label">
                <span>New Password</span>
                <input type="password" placeholder="New Password" name="new_password"
                    class={form?.form?.errors?.new_password ? "input input-error border w-full" : "input input-border border border-base-300 w-full" }
                    bind:value={new_pwd}
                />
                {#if form?.form?.errors?.new_password}
                <div role="alert" class="alert alert-error alert-soft">
                    <span>{form?.form?.errors?.new_password}</span>
                </div>
                {/if}
            </label>
        </div>

        <div class="w-full">
            <label class="floating-label">
                <span>Confirm Password</span>
                <input type="password" placeholder="Confirm Password" name="confirm_password"
                    class={"input input-border border border-base-300 w-full"}
                    bind:value={confirm_pwd}
                />
            </label>
            {#if !identical}
                <span class="text-red-600">Passwords do not match</span>
            {/if}
        </div>
        <button class="btn btn-primary" type="submit" disabled={!identical || new_pwd == ""}>Submit</button>
        </form>

        </fieldset>
        
    </Accordion.Content>
</Accordion.Item>