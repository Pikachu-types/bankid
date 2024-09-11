
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
export function paginated<T>(array: T[], page?: number, limit?: number): IPaginated<T> {
  const result: IPaginated<T> = {
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
    result.length = available < 1 ? 1: available;
  }

  return result;
}
