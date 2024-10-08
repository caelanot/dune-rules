<script lang="ts">
	import ChildRule from '$lib/childRule.svelte';
	import ListRule from '$lib/listRule.svelte';
    import MajRule from '$lib/majRule.svelte';
	import MinRule from '$lib/minRule.svelte';
	import rulesservice from '$lib/rules.svelte';
	import '$lib/scss/global.scss';
    const rules = ["classic", "landsraad"]

    let namea = $state("classic")

    $effect(() => {
        rulesservice.loadRules(namea as "classic"|"landsraad")
    })

</script>

<select bind:value={namea}>
    {#each rules as color}
      <option>
        {color}
      </option>
    {/each}
</select>

{#each Object.entries(rulesservice.rules) as [_, majorRule]}
	<MajRule rule={majorRule}>
		{#each Object.entries(majorRule.children || []) as [_, minorRule]}
            <MinRule rule={minorRule}>
                {#each Object.entries(minorRule.children || []) as [_, childRule]}
                    <ChildRule rule={childRule}>
                        <ListRule rule={childRule} />
                    </ChildRule>
                {/each}
            </MinRule>
        {/each}
    </MajRule>
{/each}