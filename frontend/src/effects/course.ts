import { AnyAction } from 'redux'
import { State } from 'reducers/types'
import {
    movePlannedCourseAPI,
    newPlannedCourseAPI,
    deletePlannedCourseAPI,
    getPlannedCourseAPI
} from 'api/plannedcourse'
import { ThunkDispatch } from 'redux-thunk'
import {
    deleteCourseAction,
    movePlannedCourseAction,
    updatePlannedCourseAction
} from 'actions/plannedCourseActions'

/**
 * Gets a course from the API and adds it to the Redux state.
 * @param id The ID of the course to get.
 */
export function getPlannedCourse (id: string) {
    return async (
        dispatch: ThunkDispatch<State, void, AnyAction>
    ): Promise<AnyAction> => {
        // We want our new course at the end of the array
        const resp = await getPlannedCourseAPI(id)
        return dispatch(updatePlannedCourseAction(resp.data))
    }
}

/**
 * Adds a new course to the Redux state, and makes a POST request to the API.
 * @param course The course name to add.
 * @param term The term to add the course to.
 */
export function addPlannedCourse (course: string, term: string) {
    return async (
        dispatch: ThunkDispatch<State, void, AnyAction>,
        getState: () => State
    ): Promise<AnyAction> => {
        // We want our new course at the end of the array
        const index = getState().terms[term].courses.length
        const resp = await newPlannedCourseAPI({ course, index, term })
        return dispatch(updatePlannedCourseAction(resp.data))
    }
}

/**
 * Moves a course within the terms.
 * @param id The ID of the course to move.
 * @param index The index of the destination.
 * @param destTerm The destination term (if it is different from the current
 * term.)
 */
export function movePlannedCourse (
    id: string,
    index: number,
    destTerm?: string
) {
    return async (
        dispatch: ThunkDispatch<State, void, AnyAction>
    ): Promise<AnyAction> => {
        const resp = await movePlannedCourseAPI({ index, term: destTerm }, id)
        return dispatch(movePlannedCourseAction({ id, index, destTerm }))
    }
}

/**
 * Deletes a course.
 * @param id The ID of the course to delete.
 */
export function deletePlannedCourse (id: string) {
    return async (
        dispatch: ThunkDispatch<State, void, AnyAction>
    ): Promise<AnyAction> => {
        const resp = await deletePlannedCourseAPI(id)
        return dispatch(deleteCourseAction(id))
    }
}