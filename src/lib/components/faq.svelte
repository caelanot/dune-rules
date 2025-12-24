<script lang="ts">
    // import { type FAQEntry } from "$lib/interfaces";
    import { type FAQEntry } from '$lib/index';
    let { faq }: { faq: FAQEntry } = $props();
</script>

<div class="faq">
    <div class="qa">
        <strong class="label">Q:</strong>
        <span>{faq.q}</span>
    </div>

    <div class="qa">
        <strong class="label">A:</strong>
        <span>{faq.a}</span>
    </div>
</div>

<style lang="scss">
    .faq {
        display: block;
        padding: 5px;
        background-color: var(--color--secondary);
        border: 1px solid var(--color--secondary);
        margin-bottom: 4px;

        &:first-child {
            margin-top: 4px;
        }
    }

    .qa {
        &:first-child {
            margin-bottom: 4px;
        }

        .label {
            display: inline-block;
            min-width: 25px;
        }
    }
</style>
