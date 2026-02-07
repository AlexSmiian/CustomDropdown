import {useCallback, useRef, useState} from "react";

export function useDropdown(disabled: boolean) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const lastInteractionRef = useRef<'mouse' | 'keyboard' | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const openDropdown = useCallback(() => {
        if (disabled || isOpen) return;

        setIsOpen(true);
        setHighlightedIndex(0);
        lastInteractionRef.current = 'keyboard';
        document.dispatchEvent(
            new CustomEvent('dropdown-open', {detail: {ref: dropdownRef.current}})
        );
    }, [disabled, isOpen]);

    const closeDropdown = useCallback(() => {
        setIsOpen(false);
        setHighlightedIndex(-1);
        lastInteractionRef.current = null;
    }, []);

    const toggleDropdown = useCallback(() => {
        if (disabled) return;

        setIsOpen((prev) => {
            const newState = !prev;
            if (newState) {
                setHighlightedIndex(0);
                lastInteractionRef.current = 'mouse';
                document.dispatchEvent(
                    new CustomEvent('dropdown-open', {detail: {ref: dropdownRef.current}})
                );
            } else {
                setHighlightedIndex(-1);
                lastInteractionRef.current = null;
            }
            return newState;
        });
    }, [disabled]);

    const handleFocus = useCallback(() => {
        if (!isOpen && lastInteractionRef.current !== 'mouse') {
            openDropdown();
        }
    }, [isOpen, openDropdown]);

    const handleMouseDown = useCallback(() => {
        lastInteractionRef.current = 'mouse';
    }, []);

    return {
        dropdownRef,
        isOpen,
        highlightedIndex,
        setHighlightedIndex,
        openDropdown,
        closeDropdown,
        toggleDropdown,
        handleFocus,
        handleMouseDown,
        setIsOpen,
    };
}
