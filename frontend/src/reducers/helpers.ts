/**
 * Deletes the given key from the dictionary. This function doesn't mutate dict.
 * @param dict The dictionary to remove the key from.
 * @param id The id of the element to delete.
 */
export function deleteFromDictionary<V> (dict: { [id: string]: V }, id: string) {
    const newDict = { ...dict }
    delete newDict[id]
    return newDict
}
