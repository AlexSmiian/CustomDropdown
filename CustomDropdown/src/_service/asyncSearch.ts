export const asyncSearch = async <T extends { label?: string } | string>(
    query: string,
    options: T[]
): Promise<T[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return options.filter((o) => {
        if (typeof o === "string") return o.toLowerCase().includes(query.toLowerCase());
        return o.label!.toLowerCase().includes(query.toLowerCase());
    });
};