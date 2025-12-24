<script lang="ts">
  import { RulesService } from '$lib/rules-service.svelte.ts'
  import RuleDisplay from '$lib/components/rule_display.svelte';
  import type { GameRule, RuleFAQData, FAQEntry } from '$lib/interfaces';
  import ruless from '$lib/assets/rules/gf9/index'
  import gf9faq from '$lib/assets/rules/gf9/faq.yml'

  var b = new RulesService
  var g = ruless.flat(2) as GameRule[]
  var gf9faq2 = gf9faq as FAQEntry[]
  var gf9: RuleFAQData = {
    rules: g,
    faqs: gf9faq2
  }
  b.setRules(gf9)
</script>

<RuleDisplay rulesservice={b} />

<style lang="scss">

</style>
