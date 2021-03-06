import { APIRequestTerm } from 'api/types/requestTypes'
import { APIResponseTerm } from 'api/types/responseTypes'
import axios from 'api'

/**
 * Creates a new term in the backend.
 * @param term The information of the new term to make.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function newTermAPI(
    term: APIRequestTerm
): Promise<APIResponseTerm> {
    const resp = await axios.post<APIResponseTerm>(`/term/`, term)
    return resp.data
}

/**
 * Gets a term from the backend.
 * @param id The ID of the term to get.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function getTermAPI(id: string): Promise<APIResponseTerm> {
    const resp = await axios.get<APIResponseTerm>(`/term/${id}/`)
    return resp.data
}

/**
 * Updates a term in the backend.
 * @param term The updated information of the term.
 * @param id The ID of the term to update.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function updateTermAPI(
    term: APIRequestTerm,
    id: string
): Promise<APIResponseTerm> {
    const resp = await axios.put<APIResponseTerm>(`/term/${id}/`, term)
    return resp.data
}

/**
 * Gets a term from the backend.
 * @param id The ID of the term to get.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function deleteTermAPI(id: string): Promise<{}> {
    const resp = await axios.delete(`/term/${id}/`)
    return resp.data
}
