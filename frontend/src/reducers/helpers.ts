import { ID } from './types'

/**
 * Deletes the given keys from the dictionary. This function doesn't mutate the
 * dictionary.
 * @param dict The dictionary to remove the keys from. This won't be modified.
 * @param ids The list of IDs to delete from the dictionary.
 * @returns A copy of the dictionary without any of the IDs in `ids`.
 */
export function deleteMultipleFromDictionary<V> (
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
export function deleteFromDictionary<T> (
    dict: { [id: string]: T },
    id: string
): { [id: string]: T } {
    const dictCopy = { ...dict }
    delete dictCopy[id]
    return dictCopy
}

/**
 * Updates multiple values in the provided dictionary.
 * @param dictionary The dictionary to update. This won't be modified.
 * @param data An array of IDs and their data to add/update in the dictionary.
 * @returns A copy of the dictionary with the updated data.
 */
export function updateMultipleInDictionary<T> (
    dictionary: { [id: string]: T },
    data: (T & ID)[]
): { [id: string]: T } {
    const dictCopy = { ...dictionary }
    data.forEach((val: T & ID) => (dictCopy[val.id] = val))
    return dictCopy
}

/**
 * Updates a value in the provided dictionary.
 * @param dictionary The dictionary to update. This won't be modified.
 * @param id The ID of the data to update.
 * @param data The data to update in the dictionary.
 * @returns A copy of the dictionary with the updated data.
 */
export function updateDictionary<T> (
    dictionary: { [id: string]: T },
    id: string,
    data: T
): { [id: string]: T } {
    return { ...dictionary, [id]: data }
}
