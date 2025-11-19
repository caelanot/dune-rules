<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Rule } from './rules/rule';
  let { rule, children }: { rule: Rule; children?: Snippet } = $props();

  import rulesservice from '$lib/rules/rules.svelte';
  let ruleid = rulesservice.indexesToRules[rule.id || rule.index];
</script>

<rule-container>
  <rule-title id={ruleid}>
    <span class="index">
      {rule.index}
    </span>
    <span class="desc">
      <a
        title={rule.karama}
        href="#{ruleid}"
        class="name"
        class:karama={rule.karama}>
        {rule.name}.
      </a>
      <span class="text">
        {@html rule.fText}
      </span>

      {@render children?.()}
    </span>
  </rule-title>
</rule-container>

<style lang="scss">
  rule-container {
    display: block;
    margin-top: 5px;
  }

  .index {
    margin-right: 20px;
    min-width: 55px;

    @media (max-width: 576px) {
      margin-right: 0px;
      min-width: 30px;
      width: 100%;
    }
  }

  rule-title {
    font-size: 15px;
    display: flex;
    flex-direction: row;

    @include for-phone-only {
      flex-wrap: wrap;
    }
    @media (max-width: 576px) {
      flex-wrap: wrap;
    }
  }
</style>
