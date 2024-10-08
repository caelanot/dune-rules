<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Rule } from './types/rule';
	let { rule }: { rule: Rule } = $props();

	import rulesservice from '$lib/rules.svelte';
</script>

{#if rule.children}
	<ol class="romanized-list list" type="I">
		{#each Object.entries(rule.children) as [_, subRule]}
			<li id={rulesservice.indexesToRules[subRule.index]}>
				<a
					href="#{rulesservice.indexesToRules[subRule.index]}"
					class="name child"
					class:karama={subRule.karama}
				>
					{subRule.name}.
				</a>
				<span class="text child">
					{@html subRule.fText}
				</span>

				{#if subRule.children}
					<ol class="alphabeta-list list" type="I">
						{#each Object.entries(subRule.children) as [_, miniRule]}
							<li id={rulesservice.indexesToRules[miniRule.index]}>
								<a
									href="#{rulesservice.indexesToRules[miniRule.index]}"
									class="name child"
									class:karama={miniRule.karama}
								>
									{miniRule.name}.
								</a>
								<span class="text child">
									{@html miniRule.fText}
								</span>
							</li>
						{/each}
					</ol>
				{/if}
			</li>
		{/each}
	</ol>
{/if}

<style lang="scss">
	.romanized-list {
		list-style-position: outside;
		list-style-type: none;

		@media (max-width: 576px) {
			padding-left: 20px;
		}

		li {
			position: relative;
			counter-increment: romanizedsub;
		}

		li::before {
			content: counters(romanizedsub, '', upper-roman);

			position: absolute;
			left: -40px;
			top: 3px;

			font-size: 12px;

			@media (max-width: 576px) {
				left: -20px;
			}
		}
	}

	.alphabeta-list {
		list-style-position: outside;
		list-style-type: none;

		@media (max-width: 576px) {
			padding-left: 20px;
		}

		li {
			position: relative;
			counter-increment: alphabetasub;
		}

		li::before {
			content: counters(alphabetasub, '', upper-alpha);

			position: absolute;
			left: -40px;
			top: 3px;

			font-size: 10px;

			@media (max-width: 576px) {
				left: -20px;
			}
		}
	}

	li {
		margin-bottom: 10px;
	}

	.list {
		margin-top: 5px;
	}
</style>
