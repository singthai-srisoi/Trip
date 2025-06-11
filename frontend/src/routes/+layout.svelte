<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="relative max-w-[100vw] px-6 pb-16 xl:pe-2">
	{@render children()}
</div>