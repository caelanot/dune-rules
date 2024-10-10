import * as marked from "marked";
import slugify from 'slugify';

import classic from "./assets/classic.yml";
import landsraad from "$lib/assets/landsraad.yml"

import type { Rule } from "./types/rule";

// export { rules };



export class RulesService {

    public rulesmode = $state("classic")
    public rulesselect = {"classic": classic, "landsraad": landsraad};

    private indexRuleHash: Record<string, string> = {};
    public get indexesToRules() {
        return this.indexRuleHash;
    }

    constructor() {
        this.loadRules("classic");
    }

    private formattedRules: Record<string, Rule> = $derived(this.loadRules(this.rulesmode as "classic"|"landsraad"));
    public get rules() {
        return this.formattedRules;
    }

    public loadRules(rulesmodea: "classic" | "landsraad") {
        return this.getFormattedRules(this.rulesselect[rulesmodea])
    }

    public slugTitle(index: string, title: string): string {
        const baseString = `${index}-${slugify(title.toLowerCase())}`
            .split('"')
            .join('');
        if (baseString.match(/^.+(\.)$/)) {
            return baseString.substring(0, baseString.length - 1);
        }
        return baseString;
    }

    private getCustomRenderer() {
        const renderer = new marked.Renderer();

        renderer.codespan = (token) => {
            let text = token.text
            if (text.includes(':')) {
                const [type, subtype, extra] = text.split(':');

                if (type === "rule") {
                    if (!this.indexRuleHash[subtype]) return `<span class="error"> Not found: ${subtype}</span>`
                    
                    return `(<a href=#${this.indexRuleHash[subtype]} class="rule-link">${extra||""}${this.indexRuleHash[subtype].split('-')[0]}</a>)`
                }

                if (type === "glossary") {
                    return `<a href=#${this.indexRuleHash[subtype]} class="glossary-link">${(extra||subtype).toLocaleUpperCase()}</a>`
                }

                if (type === 'faction') {
                    return `
                      <a href="#${this.indexRuleHash[extra]}"><img src="src/lib/assets/icons/${subtype}.jpg" class="inline-icon" /></a>
                    `;
                  }
            }

            return `<code>${text}</code>`
        }

        renderer.paragraph = (token) => {
            return `${marked.parseInline(token.text)}`;
        }

        renderer.strong = (token) => {
            return `<strong style="font-variant:small-caps">${token.text}</strong>`
        }

        return renderer;
    }

    private getFormattedRules(baseRules: Record<string, any>) {
        const renderer = this.getCustomRenderer()

        marked.use({renderer})

        const format = (str: string) => {
            if (!str) return "";
            return marked.parse(str) as string;
        }

        let index_in_category = -1;

        baseRules.forEach((rule: Rule, majorRuleIndex: number) => {
            index_in_category += 1;

            rule.fName = format(rule.name);
            rule.fText = format(rule.text);
            rule.index = `${index_in_category}`;
            this.indexRuleHash[rule.id || rule.index] = this.slugTitle(
                rule.index,
                rule.name
            );

            (rule.children || []).forEach((minorRule: Rule, minorRuleIndex: number) => {
                minorRule.fName = format(minorRule.name)
                minorRule.fText = format(minorRule.text)
                minorRule.index = `${index_in_category}.${minorRuleIndex+1}`
                this.indexRuleHash[minorRule.id || minorRule.index] = this.slugTitle(
                    minorRule.index,
                    minorRule.name
                );
                
                (minorRule.children)?.forEach((childRule: Rule, childRuleIndex: number) => {
                    childRule.fName = format(childRule.name)
                    childRule.fText = format(childRule.text)
                    childRule.index = `${index_in_category}.${minorRuleIndex+1}.${childRuleIndex+1}`
                    this.indexRuleHash[childRule.id || childRule.index] = this.slugTitle(
                        childRule.index,
                        childRule.name
                    );

                    (childRule.children)?.forEach((subRule: Rule, subRuleIndex: number) => {
                        subRule.fName = format(subRule.name)
                        subRule.fText = format(subRule.text)
                        subRule.index = `${index_in_category}.${minorRuleIndex+1}.${childRuleIndex+1}.${subRuleIndex+1}`
                        this.indexRuleHash[subRule.id || subRule.index] = this.slugTitle(
                            subRule.index,
                            subRule.name
                        );

                        (subRule.children)?.forEach((miniRule: Rule, miniRuleIndex: number) => {
                            miniRule.fName = format(miniRule.name)
                            miniRule.fText = format(miniRule.text)
                            miniRule.index = `${index_in_category}.${minorRuleIndex+1}.${childRuleIndex+1}.${subRuleIndex+1}.${miniRuleIndex+1}`
                            this.indexRuleHash[miniRule.id || miniRule.index] = this.slugTitle(
                                miniRule.index,
                                miniRule.name
                            );
                        });
                    });

                });
                
            });

        });

        return baseRules;
    }
}

const rulesservice = new RulesService();
export default rulesservice;