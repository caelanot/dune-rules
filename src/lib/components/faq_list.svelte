<script lang="ts">
    import type { FAQEntry } from "$lib/interfaces";
    import Faq from "./faq.svelte";

    let { faqs }: { faqs: FAQEntry[]} = $props()
</script>

{#each faqs as faq}
    <Faq {faq} />
{/each}

<style lang="scss">

</style>