export interface ISections {
    title: string,
    content: string,
    _id: number;
    subSections: Array<ISections> | undefined;
}
