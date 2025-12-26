<script lang="ts">
    import { RulesService } from '$lib/rules-service.svelte.ts';
    import FaqList from './faq_list.svelte';

    let { rulesservice }: { rulesservice: RulesService } = $props();

    var ruleIndexes = $derived(rulesservice.indexRuleHash);
    // console.log(rulesservice.rules)
</script>

{#each rulesservice.formatted_rules as rule}
    <div class="rule-container major" style:border-color={rule.color}>
        <!-- no text at this level -->

        <div class="rule major" id={ruleIndexes[rule.id || rule.index]}>
            <span class="index major">{rule.index_display}.</span>
            <a href="#{ruleIndexes[rule.id || rule.index]}">{rule.name}</a>
        </div>

        {#if rule.text}
            <div class="text">{@html rule.text}</div>
        {/if}

        <div class="faq">
            <FaqList faqs={rulesservice.faqs.filter((faq) => faq.rules.includes(rule.id))} />
        </div>

        {#each rule.children as crule}
            <div class="rule-container minor">
                <div class="rule minor" id={ruleIndexes[crule.id || crule.index]}>
                    <span class="index minor">{crule.index_display}</span>
                    <a href="#{ruleIndexes[crule.id || crule.index]}">{crule.formatted_name}</a>
                </div>

                {#if crule.text}
                    <div class="text">{@html crule.text}</div>
                {/if}

                <div class="faq">
                    <FaqList
                        faqs={rulesservice.faqs.filter((faq) => faq.rules.includes(crule.id))}
                    />
                </div>
                {#each crule.children as grule}
                    <div class="rule-container child">
                        <div class="rule child" id={ruleIndexes[grule.id || grule.index]}>
                            <span class="index child">
                                {grule.index_display}
                            </span>
                            <span class="desc child">
                                <a
                                    class="name child"
                                    href={'#' + ruleIndexes[grule.id || grule.index]}
                                    >{grule.formatted_name}.</a
                                >
                                <span class="text child">{@html grule.text}</span>

                                <FaqList
                                    faqs={rulesservice.faqs.filter((faq) =>
                                        faq.rules.includes(grule.id)
                                    )}
                                />

                                {#if grule.children}
                                    <ol class="romanized-list list sublist">
                                        {#each grule.children as drule}
                                            <li>
                                                <a
                                                    class="name child"
                                                    id={ruleIndexes[drule.id || drule.index]}
                                                    href={'#' +
                                                        ruleIndexes[drule.id || drule.index]}
                                                    >{drule.formatted_name}.</a
                                                >

                                                <span class="text child">{@html drule.text}</span>

                                                <FaqList
                                                    faqs={rulesservice.faqs.filter((faq) =>
                                                        faq.rules.includes(drule.id)
                                                    )}
                                                />
                                                {#if drule.children}
                                                    <ol class="alphabeta-list list sublist">
                                                        {#each drule.children as ddrule}
                                                            <li>
                                                                <a
                                                                    class="name child"
                                                                    id={ruleIndexes[
                                                                        ddrule.id || ddrule.index
                                                                    ]}
                                                                    href={'#' +
                                                                        ruleIndexes[
                                                                            ddrule.id ||
                                                                                ddrule.index
                                                                        ]}
                                                                    >{ddrule.formatted_name}.</a
                                                                >

                                                                <span class="text child"
                                                                    >{@html ddrule.text}</span
                                                                >

                                                                <FaqList
                                                                    faqs={rulesservice.faqs.filter(
                                                                        (faq) =>
                                                                            faq.rules.includes(
                                                                                ddrule.id
                                                                            )
                                                                    )}
                                                                />
                                                            </li>
                                                        {/each}
                                                    </ol>
                                                {/if}
                                            </li>
                                        {/each}
                                    </ol>
                                {/if}
                            </span>
                        </div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
{/each}

<style lang="scss">
    .rule-container {
        &.major {
            border-left-width: 10px;
            border-left-style: solid;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;

            padding-left: 20px;
            padding-top: 5px;
            padding-bottom: 5px;

            margin: 20px 5px;

            @media (max-width: 576px) {
                padding-left: 10px;
            }
        }

        &.minor:not(:last-child) {
            margin-bottom: 15px;
        }

        &.child {
            margin-bottom: 5px;
        }
    }

    .rule {
        &.major {
            font-size: 36px;
            font-weight: bold;

            @media (max-width: 576px) {
                font-size: 20px;
            }
        }

        &.minor {
            font-size: 21px;
            font-variant: small-caps;
            font-weight: bold;

            margin-top: 10px;
            margin-bottom: 0px;

            @media (max-width: 576px) {
                font-size: 18px;
            }
        }

        &.child {
            font-size: 15px;

            display: flex;
            flex-direction: row;

            @media (max-width: 576px) {
                flex-wrap: wrap;
            }
        }
    }

    .index {
        &.major {
            margin-right: 10px;

            @media (max-width: 576px) {
                margin-right: 5px;
            }
        }

        &.minor {
            margin-right: 20px;

            @media (max-width: 576px) {
                margin-right: 5px;
            }
        }

        &.child {
            margin-right: 20px;
            min-width: 55px;

            @media (max-width: 576px) {
                margin-right: 0;
                min-width: 30px;
                width: 100%;
            }
        }
    }

    .text {
        margin-bottom: 10px;

        @media (max-width: 576px) {
            font-size: 14px;
        }
    }

    .desc.child .name {
        font-weight: bold;
        margin-right: 5px;
    }

    .list {
        li:not(:last-child) {
            margin-bottom: 5px;
        }
    }

    .faq {
        display: block;
    }
</style>
