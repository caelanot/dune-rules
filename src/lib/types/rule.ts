import type { Faction } from "./faction"

export type Rule = {
    // Raw input
    name: string;
    category: number;
    colorcode: Faction;
    text: string;
    children: Rule[];
    karama: boolean;

    // Output
    fName: string;
    fText: string;
    index: string;
}