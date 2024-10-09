<script>
  import Classic from './assets/classic.svelte';
  import Landsraad from './assets/landsraad.svelte';

  import rulesservice from './rules.svelte';

  let selected = $state(false);

  const Component = $derived(selected ? Landsraad : Classic);
</script>

<button
  onclick={() => {
    selected = !selected;
    if (selected) {
      rulesservice.rulesmode = 'landsraad';
    } else {
      rulesservice.rulesmode = 'classic';
    }
  }}
>
  <Component />
</button>

<style>
  :global(svg) {
    min-width: 50px;
    max-width: 100px;
  }
</style>
