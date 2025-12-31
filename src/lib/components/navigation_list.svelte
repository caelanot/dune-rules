<script lang="ts">
    import { RulesService } from '$lib/rules-service.svelte';
    let { rulesservice }: { rulesservice: RulesService } = $props();
</script>

{#each rulesservice.formatted_rules as rule}
    <a href={'#' + rulesservice.indexRuleHash[rule.id || rule.index]}>
        <div class="item-link" style:border-color={rule.color}>
            <img src={rule.icon} class="inline-icon"/>
            <p>{rule.name}</p>
        </div>
    </a>
{/each}

<style lang="scss">
    .item-link {
        // background-color: transparent;
        height: 50px;
        padding: 20px;
        border: none;
        border-left: 5px solid;
        display: flex;
        align-items: center;
        text-align: center;
    }

    img {
        max-height: 36px;
        margin-right: 10px;
        // max-width: 20px;
        border-radius: 50%;
        overflow: hidden;
        // display: inline;
        // margin-bottom: -4px;
    }
</style>
