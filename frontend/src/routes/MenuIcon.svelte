<script lang="ts">
	import type { Snippet } from "svelte";

    interface Props {
        href: string
        is_active?: boolean
        active?: Snippet
        inactive?: Snippet
        children?: Snippet
    }

    let {
        href,
        is_active,
        active,
        inactive,
        children
    }: Props = $props()
</script>

<a 
    class={`btn btn-ghost w-full h-15 inline-flex flex-col items-center justify-center gap-1 ${is_active && 'font-bold bg-base-300'}`} 
    {href}
>
    {#if is_active && active}
        {@render active()}
    {:else}
        {@render inactive?.()}
    {/if}
    {@render children?.()}
</a>