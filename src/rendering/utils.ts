export const qs = <T extends HTMLElement>(sel: string, p?: ParentNode) => (p || document).querySelector<T>(sel)!;
export const qsa = <T extends HTMLElement>(sel: string, p?: ParentNode) => (p || document).querySelectorAll<T>(sel)!;
