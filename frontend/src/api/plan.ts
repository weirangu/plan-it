import { APIRequestPlan } from 'api/types/requestTypes'
import { APIResponsePlan } from 'api/types/responseTypes'
import axios from 'api'

/**
 * Generates a new plan on the backend.
 * @param plan The information of the new plan.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function newPlanAPI(
    plan: APIRequestPlan
): Promise<APIResponsePlan> {
    const resp = await axios.post<APIResponsePlan>(`/plan/`, plan)
    return resp.data
}

/**
 * Gets an existing Plan from the backend.
 * @param id The ID of the plan to get from the backend.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function getPlanAPI(id: string): Promise<APIResponsePlan> {
    const resp = await axios.get<APIResponsePlan>(`/plan/${id}/`)
    return resp.data
}

/**
 * Updates a plan in the backend.
 * @param plan The new information of the plan.
 * @param id The ID of the plan to update.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function updatePlanAPI(
    plan: APIRequestPlan,
    id: string
): Promise<APIResponsePlan> {
    const resp = await axios.put<APIResponsePlan>(`/plan/${id}/`, plan)
    return resp.data
}
