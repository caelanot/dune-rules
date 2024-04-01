<script lang="ts">
	import Card from '$lib/card.svelte';
	import { RulesService } from '$lib/rules.service';
	import '$lib/scss/global.scss';

	let p = new RulesService();
</script>

{#each Object.entries(p.rules) as [index, majorRule]}
	<Card faction={majorRule.colorcode}>
		<!-- Rule title and text -->
		<div class="rule major" id={p.indexesToRules[majorRule.index]}>
			<span class="index major">
				{majorRule.index}
			</span>
			<a href="#{p.indexesToRules[majorRule.index]}">
				{majorRule.name}
			</a>
		</div>

		{@html majorRule.fText}

		<!-- Child rules -->
		{#each Object.entries(majorRule.children || []) as [minorIndex, minorRule]}
			<!-- Child rule title and text -->
			<div class="rule-containor minor">
				<div class="rule minor" id={p.indexesToRules[minorRule.index]}>
					<span class="index minor">
						{minorRule.index}
					</span>
					<a href="#{p.indexesToRules[minorRule.index]}">
						{minorRule.name}
					</a>
				</div>

				{@html minorRule.fText}

				{#each Object.entries(minorRule.children || []) as [childIndex, childRule]}
					<div class="rule-containor child">
						<div class="rule child" id={p.indexesToRules[childRule.index]}>
							<span class="index child">
								{childRule.index}
							</span>
							<span class="desc child">
								<a
									href="#{p.indexesToRules[childRule.index]}"
									class="name child"
									class:karama={childRule.karama}
								>
									{childRule.name}.
								</a>
								<span class="text child">
									{@html childRule.fText}
								</span>

								{#if childRule.children}
									<ol class="romanized-list list" type="I">
										{#each Object.entries(childRule.children) as [subIndex, subRule]}
											<li id={p.indexesToRules[subRule.index]}>
												<a
													href="#{p.indexesToRules[subRule.index]}"
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
														{#each Object.entries(subRule.children) as [miniIndex, miniRule]}
															<li id={p.indexesToRules[miniRule.index]}>
																<a
																	href="#{p.indexesToRules[miniRule.index]}"
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
							</span>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</Card>
{/each}

<style lang="scss">
	.karama {
		color: blue;
	}

	// .pretext {
	//     margin-bottom: 10px;
	// }

	.rule-containor {
		&.minor {
			margin-top: 10px;
		}

		&.child {
			margin-top: 5px;
		}
	}

	.index {
		&.major {
			margin-right: 10px;

			@media (max-width: 576px) {
				margin-right: 5px;
			}
		}

		&.minor {
			margin-right: 20px;

			@media (max-width: 576px) {
				margin-right: 5px;
			}
		}

		&.child {
			margin-right: 20px;
			min-width: 55px;

            @media (max-width: 576px) {
				margin-right: 5px;
			}
		}
	}

	.rule {
		&.major {
			font-size: 36px;
			font-weight: bold;

			@media (max-width: 576px) {
				font-size: 20px;
			}
		}

		&.minor {
			font-size: 21px;
			font-variant: small-caps;
			font-weight: bold;
			margin-bottom: 5px;

			@media (max-width: 576px) {
				font-size: 18px;
			}
		}

		&.child {
			font-size: 15px;
			display: flex;
			flex-direction: row;

			@media (max-width: 576px) {
				flex-wrap: wrap;
			}
		}
	}

	a:not(.rule-link) {
		color: black;
		text-decoration: none;

		&:hover {
			color: red;
			text-decoration: underline;
		}

		&.karama {
			color: blue;
		}

		&.name {
			font-weight: bold;
			margin-right: 5px;
		}
	}

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
