<script lang="ts">
	import type { PageData } from "./$types";

    interface Props {
        data: {
            trips: Model.Trip[]
        } | PageData
    }
    let {
        data
    }: Props = $props()
</script>