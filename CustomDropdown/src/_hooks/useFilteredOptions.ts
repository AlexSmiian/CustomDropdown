import {useEffect, useRef, useState} from "react";
import type {DefaultOption} from "../_types/types.ts";

export function useFilteredOptions<T extends DefaultOption | string>(
    options: T[],
    searchQuery: string,
    onSearch?: (query: string, options: T[]) => Promise<T[]>,
    debounce = 300,
    getLabel?: (o: T) => string
) {
    const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
    const [isSearching, setIsSearching] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const filterOptions = async () => {
            if (!searchQuery.trim()) {
                setFilteredOptions(options);
                setIsSearching(false);
                return;
            }

            if (onSearch) {
                setIsSearching(true);
                try {
                    const results = await onSearch(searchQuery, options);
                    setFilteredOptions(results);
                } catch {
                    setFilteredOptions([]);
                } finally {
                    setIsSearching(false);
                }
            } else {
                const q = searchQuery.toLowerCase();
                setFilteredOptions(
                    options.filter((o) =>
                        getLabel ? getLabel(o).toLowerCase().includes(q) : String(o).toLowerCase().includes(q)
                    )
                );
            }
        };

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(filterOptions, debounce);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [searchQuery, options, onSearch, debounce, getLabel]);

    return { filteredOptions, isSearching };
}