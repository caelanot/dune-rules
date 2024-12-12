<script lang="ts">
  import ChildRule from '$lib/childRule.svelte';
  import ListRule from '$lib/listRule.svelte';
  import MajRule from '$lib/majRule.svelte';
  import MinRule from '$lib/minRule.svelte';
  import RuleButton from '$lib/RuleButton.svelte';
  import rulesservice from '$lib/rules.svelte';

  import NavBar from '$lib/NavBar.svelte';
</script>

<!-- <div>
  <RuleButton />
</div> -->

<!-- <NavBar/> -->

 <a href="/test">test</a>

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

<style lang="scss">
  div {
    position: fixed;
    top: 0px;
    right: 0px;
  }
</style>
