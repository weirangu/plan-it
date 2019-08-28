/**
 * Deletes the given keys from the dictionary. This function doesn't mutate the
 * dictionary.
 * @param dict The dictionary to remove the keys from. This won't be modified.
 * @param ids The list of IDs to delete from the dictionary.
 * @returns A copy of the dictionary without any of the IDs in `ids`.
 */
export function deleteMultipleFromDictionary<V>(
    dict: { [id: string]: V },
    ids: string[]
) {
    const dictCopy = { ...dict }
    for (const id in ids) {
        delete dictCopy[id]
    }
    return dictCopy
}

/**
 * Deletes the given key from the dictionary. This function doesn't mutate the
 * dictionary.
 * @param dict The dictionary to remove the key from. This won't be modified.
 * @param id The id of the element to delete.
 * @returns A copy of the dictionary without `id`.
 */
export function deleteFromDictionary<T>(
    dict: { [id: string]: T },
    id: string
): { [id: string]: T } {
    const dictCopy = { ...dict }
    delete dictCopy[id]
    return dictCopy
}

/**
 * Adds a item into the array at the specified index. This is a pure function.
 * @param array The array to operate on.
 * @param index The index to insert an item.
 * @param item The item to insert.
 */
export function addAtIndex<T>(array: T[], index: number, item: T): T[] {
    return [...array.slice(0, index), item, ...array.slice(index)]
}

/**
 * Replaces a item into the array at the specified index. This is a pure function.
 * @param array The array to operate on.
 * @param index The index to insert an item.
 * @param item The item to insert.
 */
export function replaceAtIndex<T>(array: T[], index: number, item: T): T[] {
    const copy = [...array]
    copy[index] = item
    return copy
}
