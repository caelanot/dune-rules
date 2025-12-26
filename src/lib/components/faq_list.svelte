<script lang="ts">
    import type { FAQEntry } from '$lib/interfaces';
    import Faq from './faq.svelte';

    let { faqs }: { faqs: FAQEntry[] } = $props();
</script>

<div>
    {#each faqs as faq}
        <Faq {faq} />
    {/each}
</div>

<style lang="scss">
    div {
        display: block;
    }
</style>
