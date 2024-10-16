<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Rule } from './types/rule';
  let { rule, children }: { rule: Rule; children: Snippet } = $props();

  import rulesservice from '$lib/rules.svelte';
</script>

<div class="rule-containor" style="border-color: var(--color--{rule.colorcode})">
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
  @media not print {
    .rule-containor {
      border-left-width: 10px;
      border-left-style: solid;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding: 5px 20px;
      margin: 20px 5px;
    }
  }

  .index {
    margin-right: 10px;
  }

  .rule {
    font-size: 36px;
    font-weight: bold;
  }
</style>
