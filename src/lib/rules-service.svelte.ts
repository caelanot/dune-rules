import { marked } from 'marked';
import { type FAQEntry, type GameRule, type RuleFAQData } from './interfaces';
import { getCustomRenderer } from './renderer';
import { slugTitle } from './slugtitle';

export class RulesService {
    public rules = $state<GameRule[]>([]);
    public faqs = $state<FAQEntry[]>([]);

    public formatted_rules = $state<GameRule[]>([]);
    public indexRuleHash = $state<Record<string, string>>({});

    public indexVisiblityHash: Record<string, any> = {};

    public setRules(entries: RuleFAQData) {
        if (!entries) return;
        this.rules = entries.rules || [];
        this.faqs = entries.faqs || [];

        this.formatRules();
    }

    private formatRules() {
        const indexHash: Record<string, string> = {};
        const allRules: GameRule[] = [];

        // const buildIndex = (arr: (number | string)[]) => arr.join('.')

        const base_rules = $state.snapshot(this.rules);

        const parseRule = (rule: GameRule, curr_index: string, display: string[] = []) => {
            // var new_index = rule.appendix ? `${rule.appendix}` :
            rule.index = `${curr_index}`;
            // rule.index_display = display.join('.');
            rule.index_display = rule.appendix ? rule.appendix : rule.index
            allRules.push(rule);

            rule.children?.forEach((subRule: GameRule, subIndex: number) => {
                display.push(subRule.appendix || `${subIndex + 1}`);
                parseRule(subRule, `${curr_index}.${subIndex + 1}`);
                display.pop();
            });
        };

        base_rules.forEach((rule, index) => {
            parseRule(rule, rule.appendix || `${index + 1}`);
        });

        allRules.forEach((rule) => {
            indexHash[rule.index] = slugTitle(rule.index, rule.name);
        });

        const renderer = getCustomRenderer(base_rules, indexHash);

        const format = (str: string) => {
            if (!str) {
                return;
            }

            return marked(str, {
                renderer
            });
        };

        allRules.forEach((rule) => {
            rule.formatted_name = format(rule.name) as string;
            rule.text = format(rule.text) as string;
            rule.pretext = format(rule.pretext) as string;
        });

        this.formatted_rules = base_rules;
        this.indexRuleHash = indexHash;
    }
}
