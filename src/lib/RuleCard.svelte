<script lang="ts">
    // import type { Rule } from './rules/rule';
	import type { GameRule } from './interfaces';
    let { rule }: { rule: GameRule} = $props();
</script>

{rule.name}

<!-- <RuleMajor rule={rule}>
	{rule.text}
	{#each Object.entries(rule.rules || []) as [_, minorRule]}
		<RuleMini rule={minorRule}>
			{#each Object.entries(minorRule.rules || []) as [_, childRule]}
				<RuleChild rule={childRule}>
					<RuleList rule={childRule} />
				</RuleChild>
			{/each}
		</RuleMini>
	{/each}
</RuleMajor> --> 

<style lang="scss">
</style>
