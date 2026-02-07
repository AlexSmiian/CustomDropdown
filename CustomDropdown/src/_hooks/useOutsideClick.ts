import { useEffect, type MouseEvent } from "react";

export function useOutsideClick(
    ref: React.RefObject<HTMLElement | null>,
    callback: () => void,
    active: boolean
) {
    useEffect(() => {
        if (!active) return;

        const handleClickOutside = (e: MouseEvent | globalThis.MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, callback, active]);
}