import * as marked from 'marked';
import { type GameRule } from '$lib/interfaces.ts';
import { slugTitle } from '$lib/slugtitle.ts';

export function getCustomRenderer(rules: GameRule[], indexRuleHash: Record<string, string>) {
    const renderer = new marked.Renderer();
    const parser = new marked.Parser({ renderer });

    renderer.codespan = (codespan: marked.Tokens.Codespan) => {
        let text = codespan.text;

        if (text.includes(':')) {
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
