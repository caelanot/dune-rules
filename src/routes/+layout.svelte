<script lang="ts">
	import favicon from '$lib/assets/logo.svg';
	import '$lib/scss/global.scss';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
