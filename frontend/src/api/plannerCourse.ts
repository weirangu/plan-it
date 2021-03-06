import {
    APIRequestMovePlannerCourse,
    APIRequestPlannerCourse
} from 'api/types/requestTypes'
import { APIResponsePlannerCourse } from 'api/types/responseTypes'
import axios from 'api'

/**
 * Creates a new PlannerCourse.
 * @param course The new course information.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function newPlannerCourseAPI(
    course: APIRequestPlannerCourse
): Promise<APIResponsePlannerCourse> {
    const resp = await axios.post<APIResponsePlannerCourse>(
        `/plannercourse/`,
        course
    )
    return resp.data
}

/**
 * Gets a PlannerCourse from the backend.
 * @param id The ID of the course to get.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function getPlannerCourseAPI(
    id: string
): Promise<APIResponsePlannerCourse> {
    const resp = await axios.get<APIResponsePlannerCourse>(
        `/plannercourse/${id}/`
    )
    return resp.data
}

/**
 * Updates an existing PlannerCourse.
 * @param course The new information of the course to update.
 * @param id The ID of the PlannerCourse to update.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function updatePlannerCourseAPI(
    course: APIRequestPlannerCourse,
    id: string
): Promise<APIResponsePlannerCourse> {
    const resp = await axios.put<APIResponsePlannerCourse>(
        `/plannercourse/${id}/`,
        course
    )
    return resp.data
}

/**
 * Moves a PlannerCourse within a term.
 * @param req The request to send back to the backend.
 * @param id The ID of the course to move.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function movePlannerCourseAPI(
    req: APIRequestMovePlannerCourse,
    id: string
): Promise<APIResponsePlannerCourse> {
    const resp = await axios.put<APIResponsePlannerCourse>(
        `/plannercourse/${id}/move/`,
        req
    )
    return resp.data
}

/**
 * Deletes a PlannerCourse.
 * @param id The ID of the course to delete.
 * @throws If the response isn't 2XX or if a connection couldn't be made, Axios
 * throws an error.
 */
export async function deletePlannerCourseAPI(id: string): Promise<{}> {
    const resp = await axios.delete(`/plannercourse/${id}/`)
    return resp.data
}
