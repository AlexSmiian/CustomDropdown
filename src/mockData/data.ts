import type {CountryOption, ProductCategory} from "../_types/types.ts";

export const countryOptions: CountryOption[] = [
    {value: 'ua', label: 'Україна', flag: '🇺🇦'},
    {value: 'us', label: 'США', flag: '🇺🇸'},
    {value: 'uk', label: 'Велика Британія', flag: '🇬🇧'},
    {value: 'de', label: 'Німеччина', flag: '🇩🇪'},
];

export const cityOptions: string[] = ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро'];

export const categoryOptions: ProductCategory[] = [
    {value: 'electronics', label: 'Електроніка'},
    {value: 'books', label: 'Книги'},
    {value: 'clothes', label: 'Одяг'},
    {value: 'toys', label: 'Іграшки'},
];