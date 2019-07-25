import {
    APIRequestMovePlannedCourse,
    APIRequestPlannedCourse
} from 'api/types/requestTypes'
import { APIResponsePlannedCourse } from 'api/types/responseTypes'
import axios from 'api'

/**
 * Creates a new PlannedCourse.
 * @param course The new course information.
 */
export async function newPlannedCourseAPI(
    course: APIRequestPlannedCourse
): Promise<APIResponsePlannedCourse> {
    const resp = await axios.post<APIResponsePlannedCourse>(
        `/plannedcourse/`,
        course
    )
    return resp.data
}

/**
 * Gets a PlannedCourse from the backend.
 * @param id The ID of the course to get.
 */
export async function getPlannedCourseAPI(
    id: string
): Promise<APIResponsePlannedCourse> {
    const resp = await axios.get<APIResponsePlannedCourse>(
        `/plannedcourse/${id}/`
    )
    return resp.data
}

/**
 * Updates an existing PlannedCourse.
 * @param course The new information of the course to update.
 * @param id The ID of the PlannedCourse to update.
 */
export async function updatePlannedCourseAPI(
    course: APIRequestPlannedCourse,
    id: string
): Promise<APIResponsePlannedCourse> {
    const resp = await axios.put<APIResponsePlannedCourse>(
        `/plannedcourse/${id}/`,
        course
    )
    return resp.data
}

/**
 * Moves a PlannedCourse within a term.
 * @param req The request to send back to the backend.
 * @param id The ID of the course to move.
 */
export async function movePlannedCourseAPI(
    req: APIRequestMovePlannedCourse,
    id: string
): Promise<APIResponsePlannedCourse> {
    const resp = await axios.put<APIResponsePlannedCourse>(
        `/plannedcourse/${id}/move/`,
        req
    )
    return resp.data
}

/**
 * Deletes a PlannedCourse.
 * @param id The ID of the course to delete.
 */
export async function deletePlannedCourseAPI(id: string): Promise<{}> {
    const resp = await axios.delete(`/plannedcourse/${id}/`)
    return resp.data
}
