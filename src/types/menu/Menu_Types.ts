export interface MenuOption {
    name: string;
    icon?: string;
    action: () => void;
}


export type MenuOptionDetailsType = {
    [key: string]: {
        name: string;
        icon?: string;
    };
};