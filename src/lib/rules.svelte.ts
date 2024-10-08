import * as marked from "marked";
import slugify from 'slugify';

import classic from "./assets/classic.yml";
import landsraad from "$lib/assets/landsraad.yml"

import type { Rule } from "./types/rule";

export class RulesService {

    public rulesmode = $state("classic")
    private rulesselect = {"classic": classic, "landsraad": landsraad};

    public indexVisibilityHash = {};

    private indexRuleHash: Record<string, string> = {};
    public get indexesToRules() {
        return this.indexRuleHash;
    }

    constructor() {
        this.loadRules("classic");
    }

    private formattedRules: Record<string, Rule> = $state({});
    public get rules() {
        return this.formattedRules;
    }

    public loadRules(rulesmodea: "classic" | "landsraad") {
        this.formattedRules = this.getFormattedRules(this.rulesselect[rulesmodea]);
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

        renderer.paragraph = (token) => {
            return `${marked.parseInline(token.text)}`;
        }

        renderer.strong = (token) => {
            return `<strong style="font-variant:small-caps">${token.text}</strong>`
        }

        return renderer;
    }

    private getFormattedRules(baseRules: Record<string, any>) {
        // const baseRules = this.rulesselect.classic;
        const renderer = this.getCustomRenderer()

        marked.use({renderer})

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

        return baseRules;
    }
}

const rulesservice = new RulesService();
export default rulesservice;