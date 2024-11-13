<script>
  let { children } = $props();
  import { theme } from "$lib/runes/theme.svelte";
  import '$lib/scss/global.scss';
</script>

{@render children()}
