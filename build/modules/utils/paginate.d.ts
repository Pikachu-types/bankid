interface IPaginated<T> {
    next?: Record<string, unknown>;
    previous?: Record<string, unknown>;
    result: T[];
    /**
     * Number of pages available
     */
    length?: number;
}
/**
 * Paginates an array of elements based on the specified page and limit.
 * @param {T[]} array The array of elements to paginate.
 * @param {number} page The page number for pagination.
 * @param {number} limit The maximum number of elements per page.
 * @return {IPaginated<T>} An object containing the paginated result along with optional next and previous page information.
 */
export declare function paginated<T>(array: T[], page?: number, limit?: number): IPaginated<T>;
export {};
