import * as marked from 'marked';
import { type GameRule } from '$lib/interfaces.ts';
import { slugTitle } from '$lib/slugtitle.ts';

export function getCustomRenderer(rules: GameRule[], indexRuleHash: Record<string, string>) {
    const renderer = new marked.Renderer();
    const parser = new marked.Parser({ renderer });
    console.log(indexRuleHash)

    renderer.codespan = (codespan: marked.Tokens.Codespan) => {
        let text = codespan.text;
        console.log("codespan text", codespan.text)

        if (text.includes(':')) {
            const [type, subtype] = text.split(':')
            if (type === "rule") {
                console.log("parsing ", type, subtype)
                if (!(subtype in indexRuleHash)) {
                    return `<span class="error">Not found: ${subtype}</span>`
                }
                console.log(indexRuleHash[subtype])
                // return `<a href="#${indexRuleHash[subtype]}" class="rule-link">(${indexRuleHash[subtype]})</a>`
                return `(<a href="#${indexRuleHash[subtype]}" class="rule-link">${indexRuleHash[subtype].split('-')[0]}</a>)`
            }
        }

        return `${text}`;
    };

    renderer.blockquote = (blockquote: marked.Tokens.Blockquote) =>
        `<div class="specialhighlight">${parser.parse(blockquote.tokens)}</div>`;

    renderer.strong = (strong: marked.Tokens.Strong) =>
        `<span class="emph">${parser.parseInline(strong.tokens)}</span>`;

    renderer.paragraph = (paragraph: marked.Tokens.Paragraph) =>
        `${parser.parseInline(paragraph.tokens)}`;

    return renderer;
}
