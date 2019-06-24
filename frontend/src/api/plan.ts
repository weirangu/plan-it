import axios, { AxiosPromise } from 'axios'
import { APIResponsePlan } from 'api/types/responseTypes'
import { APIRequestPlan } from 'api/types/requestTypes'

/**
 * Generates a new plan on the backend.
 * @param plan The information of the new plan.
 */
export function newPlanAPI (
    plan: APIRequestPlan
): AxiosPromise<APIResponsePlan> {
    return axios.post<APIResponsePlan>(`http://localhost:8000/plan/`, plan)
}

/**
 * Gets an existing Plan from the backend.
 * @param id The ID of the plan to get from the backend.
 */
export function getPlanAPI (id: string): AxiosPromise<APIResponsePlan> {
    return axios.get<APIResponsePlan>(`http://localhost:8000/plan/${id}/`)
}

/**
 * Updates a plan in the backend.
 * @param plan The new information of the plan.
 * @param id The ID of the plan to update.
 */
export function updatePlanAPI (
    plan: APIRequestPlan,
    id: string
): AxiosPromise<APIResponsePlan> {
    return axios.put<APIResponsePlan>(`http://localhost:8000/plan/${id}/`, plan)
}
