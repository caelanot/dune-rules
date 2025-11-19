<script lang="ts">
    import type { Rule } from './rules/rule';
    let { rule }: { rule: Rule} = $props();
	import RuleMajor from '$lib/RuleMajor.svelte';
	import RuleMini from '$lib/RuleMini.svelte';
	import RuleChild from '$lib/RuleChild.svelte';
	import RuleList from '$lib/RuleList.svelte';
</script>

<!-- <div>
  <RuleButton />
</div> -->

<!-- <NavBar/> -->

<!-- <Faction></Faction> -->

<RuleMajor rule={rule}>
	{#each Object.entries(rule.rules || []) as [_, minorRule]}
		<RuleMini rule={minorRule}>
			{#each Object.entries(minorRule.rules || []) as [_, childRule]}
				<RuleChild rule={childRule}>
					<RuleList rule={childRule} />
				</RuleChild>
			{/each}
		</RuleMini>
	{/each}
</RuleMajor>

<style lang="scss">
</style>
