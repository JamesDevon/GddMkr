export interface DropDown {
    id: string;
    title: string;
    values: string[];
    selectors: DropDownSelector[];
}

export interface DropDownSelector {
    id: string;
    title: string;
    description: string;
}
