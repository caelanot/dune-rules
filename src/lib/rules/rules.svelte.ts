import * as marked from "marked";
import slugify from 'slugify';

import main_rules from "./game_rules/main_rules.yml";
import gf9factions from "./game_rules/gf9/factions.yml";
import gf9treachery from "./game_rules/gf9/treachery.yml";
import gf9variants from "./game_rules/gf9/variants.yml";
import gf9appendix from "./game_rules/gf9/appendix.yml";

import type { Rule } from "./rule.ts";


export class RulesService {

    public rulesmode = $state("classic")
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
        let gf9_rules = main_rules.concat(gf9factions, gf9treachery, gf9variants, gf9appendix);
        return this.getFormattedRules(gf9_rules)
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
                if (!this.indexRuleHash[subtype]) return `<span class="error"> Not found: ${subtype}</span>`

                if (type === "rule") {
                    return `[<a href=#${this.indexRuleHash[subtype]} class="rule-link">${extra||""}${this.indexRuleHash[subtype].split('-')[0]}</a>]`
                }

                if (type === "glossary") {
                    return `<a href=#${this.indexRuleHash[subtype]} class="glossary-link">${(extra||subtype).toLocaleUpperCase()}</a>`
                }

                // if (type === 'faction') {
                //     return `
                //       <a href="#${this.indexRuleHash[extra]}"><img src="src/lib/assets/icons/${subtype}.jpg" class="inline-icon" /></a>
                //     `;
                //   }
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

        const parseRule = (rule: Rule, index: string) => {
            let index_in_category = 1;

            rule.fName = format(rule.name);
            rule.fText = format(rule.text);
            rule.index = `${index}`
            this.indexRuleHash[rule.id || rule.index] = this.slugTitle(
                rule.index,
                rule.name
            );

            (rule.rules)?.forEach((subRule: Rule, subIndex: number) => {
                parseRule(subRule, `${index}.${subIndex+1}`)
            });
        }

        baseRules.forEach((rule: Rule, index: number) => {
            parseRule(rule, `${index+1}`);
        })

        return baseRules;
    }
}

const rulesservice = new RulesService();
export default rulesservice;