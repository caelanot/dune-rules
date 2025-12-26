<script lang="ts">
    import { RulesService } from '$lib/rules-service.svelte';
    let { rulesservice }: { rulesservice: RulesService } = $props();
</script>

{#each rulesservice.rules as rule}
    <button class="item-link" style:border-color="{rule.color}" onclick={() => {
        console.log("akjshfkjsdhg")
    }}> {rule.name} </button>
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

    button {
        width: 100%;
    }
</style>
