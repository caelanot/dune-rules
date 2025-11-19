<script lang="ts">
  import rulesservice from '$lib/rules/rules.svelte';
  import RuleCard from '$lib/RuleCard.svelte';
</script>

<!-- <div>
  <RuleButton />
</div> -->

<!-- <NavBar/> -->

<!-- <Faction></Faction> -->

{#each Object.entries(rulesservice.rules) as [_, majorRule]}
  <RuleCard rule={majorRule} />
{/each}

<style lang="scss">

</style>
