<script lang="ts">
	import type { Snippet } from "svelte";
    import type { SVGAttributes } from "svelte/elements";

    interface Props extends SVGAttributes<SVGSVGElement> {
        slot?: string
        children?: Snippet
    }

    let {
        children,
        ...props
    }: Props = $props()
</script>

<svg {...props}>
    {@render children?.()}
</svg>