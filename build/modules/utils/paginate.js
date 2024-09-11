"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginated = void 0;
/**
 * Paginates an array of elements based on the specified page and limit.
 * @param {T[]} array The array of elements to paginate.
 * @param {number} page The page number for pagination.
 * @param {number} limit The maximum number of elements per page.
 * @return {IPaginated<T>} An object containing the paginated result along with optional next and previous page information.
 */
function paginated(array, page, limit) {
    const result = {
        result: array,
    };
    // If page or limit is not provided, return the entire array without pagination
    if (!page || !limit) {
        return {
            result: array,
        };
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // Add next page information if there are more elements beyond the current page
    if (endIndex < array.length) {
        result.next = {
            page: page + 1,
            limit: limit,
        };
    }
    // Add previous page information if the current page is not the first page
    if (startIndex > 0) {
        result.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    // Extract the elements for the current page based on startIndex and endIndex
    result.result = array.slice(startIndex, endIndex);
    // calculate the length
    if (page && limit) {
        const available = Number.parseInt((array.length / limit).toFixed(0));
        result.length = available < 1 ? 1 : available;
    }
    return result;
}
exports.paginated = paginated;
//# sourceMappingURL=paginate.js.map