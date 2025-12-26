<script lang="ts">
    import { RulesService } from '$lib/rules-service.svelte';
    let { rulesservice }: { rulesservice: RulesService } = $props();

</script>

{#each rulesservice.formatted_rules as rule}
    <a href={'#' + rulesservice.indexRuleHash[rule.id || rule.index]}>
        <div class="item-link" style:border-color={rule.color}>
            {rule.name}
        </div>
    </a>
{/each}

<style lang="scss">
    .item-link {
        background-color: transparent;
        height: 50px;
        padding: 20px;
        border: none;
        border-left: 5px solid;
        display: flex;
        align-items: center;
    }
</style>
