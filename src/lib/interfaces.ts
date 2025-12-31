export interface GameRule {
    name: string
    plain_name: string
    formatted_name: string
    index: string
    index_display: string
    appendix: string
    tag: string // Used to hide elements
    id: string // Used to refer to other rules
    icon: string

    color: string
    pretext: string
    text: string
    children: GameRule[]
}

export interface FAQEntry {
    q: string
    a: string
    rules: string[]
}

export interface InfoEntry {
    text: string
    rules: string[]
}

export interface RuleFAQData {
    rules: GameRule[];
    faqs?: FAQEntry[];
}