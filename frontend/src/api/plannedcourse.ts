import axios, { AxiosPromise } from 'axios'
import {
    APIRequestPlannedCourse,
    APIRequestMovePlannedCourse
} from 'api/types/requestTypes'
import { APIResponsePlannedCourse } from 'api/types/responseTypes'

/**
 * Creates a new PlannedCourse.
 * @param course The new course information.
 */
export function newPlannedCourseAPI (
    course: APIRequestPlannedCourse
): AxiosPromise<APIResponsePlannedCourse> {
    return axios.post<APIResponsePlannedCourse>(
        `http://localhost:8000/plannedcourse/`,
        course
    )
}

/**
 * Gets a PlannedCourse from the backend.
 * @param id The ID of the course to get.
 */
export function getPlannedCourseAPI (
    id: string
): AxiosPromise<APIResponsePlannedCourse> {
    return axios.get<APIResponsePlannedCourse>(
        `http://localhost:8000/plannedcourse/${id}/`
    )
}

/**
 * Updates an existing PlannedCourse.
 * @param course The new information of the course to update.
 * @param id The ID of the PlannedCourse to update.
 */
export function updatePlannedCourseAPI (
    course: APIRequestPlannedCourse,
    id: string
): AxiosPromise<APIResponsePlannedCourse> {
    return axios.put<APIResponsePlannedCourse>(
        `http://localhost:8000/plannedcourse/${id}/`,
        course
    )
}

/**
 * Moves a PlannedCourse within a term.
 * @param id The ID of the course to move.
 * @param index The new index of the course.
 * @param newTerm The new term to assign this course to (if we're changing terms).
 */
export function movePlannedCourseAPI (
    req: APIRequestMovePlannedCourse,
    id: string
) {
    return axios.put<APIResponsePlannedCourse>(
        `http://localhost:8000/plannedcourse/${id}/move/`,
        req
    )
}

/**
 * Deletes a PlannedCourse.
 * @param id The ID of the course to delete.
 */
export function deletePlannedCourseAPI (id: string) {
    return axios.delete(`http://localhost:8000/plannedcourse/${id}/`)
}
