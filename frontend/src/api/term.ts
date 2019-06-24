import axios, { AxiosPromise } from 'axios'
import { APIRequestTerm } from 'api/types/requestTypes'
import { APIResponseTerm } from 'api/types/responseTypes'

/**
 * Creates a new term in the backend.
 * @param term The information of the new term to make.
 */
export function newTermAPI (
    term: APIRequestTerm
): AxiosPromise<APIResponseTerm> {
    return axios.post<APIResponseTerm>(`http://localhost:8000/term/`, term)
}

/**
 * Gets a term from the backend.
 * @param id The ID of the term to get.
 */
export function getTermAPI (id: string): AxiosPromise<APIResponseTerm> {
    return axios.get<APIResponseTerm>(`http://localhost:8000/term/${id}/`)
}

/**
 * Updates a term in the backend.
 * @param term The updated information of the term.
 * @param id The ID of the term to update.
 */
export function updateTermAPI (
    term: APIRequestTerm,
    id: string
): AxiosPromise<APIResponseTerm> {
    return axios.put<APIResponseTerm>(`http://localhost:8000/term/${id}/`, term)
}

/**
 * Gets a term from the backend.
 * @param id The ID of the term to get.
 */
export function deleteTermAPI (id: string): AxiosPromise<APIResponseTerm> {
    return axios.delete(`http://localhost:8000/term/${id}/`)
}
