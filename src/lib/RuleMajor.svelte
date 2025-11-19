<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Rule } from './rules/rule';
  let { rule, children }: { rule: Rule; children?: Snippet } = $props();

  import rulesservice from '$lib/rules/rules.svelte';
  let ruleid = rulesservice.indexesToRules[rule.id || rule.index];
</script>

<rule-container style:border-color={rule.colorcode || "#23261c"}>
  <rule-title id={ruleid}>
    <span class="index">
      {rule.index}.
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
    border-left-width: 10px;
    border-left-style: solid;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 5px 20px;
    margin: 20px 5px;
    // border-color: black;
  }
  rule-title {
    display: block;
    font-size: 36px;
    font-weight: bold;
  }

  .index {
    margin-right: 10px;
  }
</style>
