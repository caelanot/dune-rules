<script lang="ts">
    import { RulesService } from '$lib/rules-service.svelte.ts';
    import RuleDisplay from '$lib/components/rule_display.svelte';
    import type { GameRule, RuleFAQData, FAQEntry } from '$lib/interfaces';
    import ruless from '$lib/assets/rules/gf9/index';
    import gf9faq from '$lib/assets/rules/gf9/faq.yml';

    var b = new RulesService();
    var g = ruless.flat(Infinity) as GameRule[];

    import {mainrules, factions} from '$lib/assets/rules/gf9/index'
    var d = [mainrules, factions].flat(Infinity) as GameRule[]
    var gf9faq2 = gf9faq as FAQEntry[];
    var gf9: RuleFAQData = {
        rules: g,
        faqs: gf9faq2
    };
    b.setRules(gf9);

    import NavigationList from '$lib/components/navigation_list.svelte';
    import A from '$lib/components/a.svelte';
</script>

<div class="navbar">
    <button onclick={() => b.setRules(gf9)}>GF9</button>
    <button onclick={() => b.setRules({rules: d})}>No Variants test</button>
</div>

<div class="grid-container">
    <section class="scrollable-column">
        <NavigationList rulesservice={b} />
    </section>
    <section class="scrollable-column">
        <RuleDisplay rulesservice={b} />
    </section>
</div>

<style>
    .navbar {
        height: 56px;
        /* background-color: brown; */
        box-shadow: red;
        border-bottom: 5px solid black;
        position: sticky;

    }

    .grid-container {
        display: grid;
        grid-template-columns: 1fr 3fr;
        height: calc(100vh - 56px);
        /* height: 100vh; */
    }

    .scrollable-column {
        overflow-y: auto; /* Enables independent scrolling */
        height: 100%;
        scroll-behavior: smooth;
    }
</style>
