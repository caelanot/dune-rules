<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Rule } from './types/rule';
  let { rule, children }: { rule: Rule; children: Snippet } = $props();

  import rulesservice from '$lib/rules.svelte';
</script>

<div class="rule-containor">
  <div class="rule" id={rulesservice.indexesToRules[rule.id || rule.index]}>
    <span class="index">
      {rule.index}
    </span>
    <span class="desc">
      <a href="#{rulesservice.indexesToRules[rule.id || rule.index]}" class="name" class:karama={rule.karama}>
        {rule.name}.
      </a>
      <span class="text">
        {@html rule.fText}
      </span>

      {@render children()}
    </span>
  </div>
</div>

<style lang="scss">
  .rule-containor {
    margin-top: 5px;
  }

  .index {
    margin-right: 20px;
    min-width: 55px;
  }

  .rule {
    font-size: 15px;
    display: flex;
    flex-direction: row;

    @media (max-width: 576px) {
      flex-wrap: wrap;
    }
  }
</style>
