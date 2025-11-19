<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Rule } from './rules/rule';
  let { rule, children }: { rule: Rule; children?: Snippet } = $props();

  import rulesservice from '$lib/rules/rules.svelte';
  let ruleid = rulesservice.indexesToRules[rule.id || rule.index];
</script>

<rule-container style:border-color={rule.colorcode}>
  <rule-title id={ruleid}>
    <span class="index">
      {rule.index}
    </span>
    <a href="#{ruleid}">
      {rule.name}
    </a>
  </rule-title>

  {@html rule.fText}

  {@render children?.()}
</rule-container>

<style lang="scss">
  rule-container {
    display: block;
    margin-top: 10px;
    // border-color: black;
  }

  .index {
    margin-right: 20px;
    min-width: 35px;
    display: inline-block;
  }

  rule-title {
    display: block;
    font-size: 21px;
    font-variant: small-caps;
    font-weight: bold;
    margin-bottom: 5px;
  }
</style>
