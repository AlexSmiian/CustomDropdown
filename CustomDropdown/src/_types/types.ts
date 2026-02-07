export type DefaultOption = {
    value: string;
    label: string;
};

export type CustomDropdownProps<T> = {
    options: T[];
    value: string | null;
    onChange?: (option: T) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    renderOption?: (option: T, selected: boolean) => React.ReactNode;
    renderSelected?: (option: T) => React.ReactNode;
    onSearch?: (query: string, options: T[]) => Promise<T[]>;
    searchDebounce?: number;
    disabled?: boolean;
    className?: string;
};

export type CountryOption = {
    value: string;
    label: string;
    flag: string;
};

export type ProductCategory = {
    value: string;
    label: string;
};