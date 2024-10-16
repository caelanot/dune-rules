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
    <a href="#{rulesservice.indexesToRules[rule.id || rule.index]}">
      {rule.name}
    </a>
  </div>

  {@html rule.fText}

  {@render children()}
</div>

<style lang="scss">
  .rule-containor {
    margin-top: 10px;
  }

  .index {
    margin-right: 20px;
    min-width: 35px;
    display: inline-block;
  }

  .rule {
    font-size: 21px;
    font-variant: small-caps;
    font-weight: bold;
    margin-bottom: 5px;
  }
</style>
