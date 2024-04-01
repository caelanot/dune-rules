<script lang="ts">
    import type { Faction } from "./types/faction";
    export let faction: Faction;
</script>

<div class="rule-containor major" style="border-color: var(--color--{faction})">
	<slot />
</div>

<style lang="scss">
	div {
		border-left-width: 10px;
		border-left-style: solid;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		padding: 5px 20px;
		margin: 20px 5px;
	}
</style>