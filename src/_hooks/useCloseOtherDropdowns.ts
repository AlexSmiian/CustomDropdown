import {useEffect} from "react";

export function useCloseOtherDropdowns(ref: React.RefObject<HTMLDivElement | null>, close: () => void) {
    useEffect(() => {
        const handler = (e: Event) => {
            const custom = e as CustomEvent<{ ref: HTMLDivElement | null }>;
            if (custom.detail.ref !== ref.current) close();
        };
        document.addEventListener('dropdown-open', handler);
        return () => document.removeEventListener('dropdown-open', handler);
    }, [ref, close]);
}