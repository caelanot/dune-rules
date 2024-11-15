<script lang="ts">
    import Logo from "$lib/assets/icons/dune_logo.svelte"
    import Button from '$lib/Button.svelte';

    import '$lib/scss/global.scss';
</script>

<header>
    <Logo/>
    <Button/>
</header>

<style lang="scss">
    header {
        z-index: 1;
        position: sticky;
        top: 0;
        display: flex;
        background-color: var(--color--page-background);
        filter: drop-shadow(0rem 0rem 0.25rem black);
        
    }
</style>