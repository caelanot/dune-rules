export type Rule = {
    // Raw input
    name: string;
    category: number;
    colorcode: string;
    text: string;
    rules: Rule[];
    karama: string;
    id: string;
    addendums: string[];
    overrules: string[];

    // Output
    fName: string;
    fText: string;
    index: string;
}