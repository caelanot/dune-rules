import * as marked from "marked";
import slugify from 'slugify';

import rules from "./assets/rules.yml";

export { rules };

import type { Rule } from "./types/rule";


export class RulesService {

    public indexVisibilityHash = {};

    private indexRuleHash: Record<string, string> = {};
    public get indexesToRules() {
        return this.indexRuleHash;
    }

    private formattedRules: Record<string, Rule> = {};
    public get rules() {
        return this.formattedRules;
    }

    constructor() {
        this.loadRules();
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

    public loadRules() {
        this.formattedRules = this.getFormattedRules();
        this.formattedRules = this.getFormattedRules();
    }

    private getCustomRenderer(allRules: Record<string, any>) {
        const renderer = new marked.Renderer();

        renderer.codespan = (text: string) => {
            if (text.includes(':')) {
                const [type, subtype, extra] = text.split(':');

                if (type === "rule") {
                    const [major, minor, child, desc, descDesc] = subtype.split('.');

                    // let chosenNode = null;
                    // let chosenString = "";

                    // if (major) {
                    //     chosenString += major;
                    //     chosenNode = allRules[+major]
                    // }

                    // if (minor && chosenNode && chosenNode.children) {
                    //     chosenString += `.${minor}`
                    //     chosenNode = chosenNode.children[+minor - 1]
                    // }

                    // if (child && chosenNode && chosenNode.children) {
                    //     chosenString += `.${child}`
                    //     chosenNode = chosenNode.children[+child - 1]
                    // }

                    // if (desc && chosenNode && chosenNode.children) {
                    //     chosenString += `.${desc}`
                    //     chosenNode = chosenNode.children[+desc - 1]
                    // }

                    // if (descDesc && chosenNode && chosenNode.children) {
                    //     chosenString += `.${descDesc}`
                    //     chosenNode = chosenNode.children[+descDesc - 1]
                    // }

                    if (!this.indexRuleHash[subtype]) return `<span class="error"> Not found: ${subtype}</span>`
                    
                    return `(<a href=#${this.indexRuleHash[subtype]} class="rule-link">${subtype}</a>)`
                    return `(<a href=#${this.slugTitle(
                        subtype,
                        this.indexRuleHash[subtype]
                        )} class="rule-link">${subtype}</a>)`


                    

                    // if (!chosenNode) return `<span class="error"> Not found: ${subtype}</span>`

                    // return `(<a href=#${this.slugTitle(
                    //     subtype,
                    //     chosenNode.name
                    //     )} class="rule-link">${chosenString}</a>)`
                }

                if (type === 'faction') {
                    return `
                      <a href="#${this.indexRuleHash[extra]}"><img src="src/lib/assets/${type}-${subtype}.jpg" class="inline-icon" /></a>
                    `;
                  }
            }

            return `<code>${text}</code>`
        }

        renderer.strong = (text: string) => {
            return `<strong style="font-variant:small-caps">${text}</strong>`
        }

        renderer.paragraph = (text: string) => {
            return `${text}`;
        }

        return renderer;
    }

    private getFormattedRules() {
        const baseRules = rules;
        const renderer = this.getCustomRenderer(rules)

        marked.use({ renderer })

        const format = (str: string) => {
            if (!str) return "";
            return marked.parse(str) as string;
        }

        let prev_category = -1;
        let index_in_category = 1;

        baseRules.forEach((rule: Rule, majorRuleIndex: number) => {
            index_in_category += 1;
            if (prev_category != rule.category) {
                prev_category = rule.category;
                index_in_category = 1;
            }

            rule.fName = format(rule.name);
            rule.fText = format(rule.text);
            rule.index = `${rule.category}.${index_in_category}`;
            this.indexRuleHash[rule.index] = this.slugTitle(
                rule.index,
                rule.name
            );

            (rule.children || []).forEach((childRule: Rule, minorRuleIndex: number) => {
                childRule.fName = format(childRule.name)
                childRule.fText = format(childRule.text)
                childRule.index = `${rule.category}.${index_in_category}.${minorRuleIndex+1}`
                this.indexRuleHash[childRule.index] = this.slugTitle(
                    childRule.index,
                    childRule.name
                );
                
                (childRule.children || []).forEach((childRule: Rule, childRuleIndex: number) => {
                    childRule.fName = format(childRule.name)
                    childRule.fText = format(childRule.text)
                    childRule.index = `${rule.category}.${index_in_category}.${minorRuleIndex+1}.${childRuleIndex+1}`
                    this.indexRuleHash[childRule.index] = this.slugTitle(
                        childRule.index,
                        childRule.name
                    );

                    (childRule.children || []).forEach((subRule: Rule, subRuleIndex: number) => {
                        subRule.fName = format(subRule.name)
                        subRule.fText = format(subRule.text)
                        subRule.index = `${rule.category}.${index_in_category}.${minorRuleIndex+1}.${childRuleIndex+1}.${subRuleIndex+1}`
                        this.indexRuleHash[subRule.index] = this.slugTitle(
                            subRule.index,
                            subRule.name
                        );

                        (subRule.children || []).forEach((miniRule: Rule, miniRuleIndex: number) => {
                            miniRule.fName = format(miniRule.name)
                            miniRule.fText = format(miniRule.text)
                            miniRule.index = `${rule.category}.${index_in_category}.${minorRuleIndex+1}.${childRuleIndex+1}.${subRuleIndex+1}.${miniRuleIndex+1}`
                            this.indexRuleHash[miniRule.index] = this.slugTitle(
                                miniRule.index,
                                miniRule.name
                            );
                        });
                    });

                });
                
            });

        });

        // console.log(baseRules);

        return baseRules;
    }
}