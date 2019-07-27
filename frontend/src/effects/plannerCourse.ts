import { AnyAction } from 'redux'
import { RootState } from 'reducers/types'
import {
    movePlannerCourseAPI,
    newPlannerCourseAPI,
    deletePlannerCourseAPI
} from 'api/plannerCourse'
import { ThunkDispatch } from 'redux-thunk'
import {
    deletePlannerCourseAction,
    movePlannerCourseAction,
    updatePlannerCourseAction
} from 'actions/plannerCourseActions'

/**
 * Adds a new course to the Redux state, and makes a POST request to the API.
 * @param course The course name to add.
 * @param term The term to add the course to.
 */
export function addPlannerCourse(course: string, term: string) {
    return async (
        dispatch: ThunkDispatch<RootState, void, AnyAction>,
        getState: () => RootState
    ): Promise<AnyAction> => {
        // We want our new course at the end of the array
        const index = getState().terms[term].courses.length
        const resp = await newPlannerCourseAPI({ course, index, term })
        return dispatch(
            updatePlannerCourseAction(
                resp.course,
                resp.term,
                resp.id,
                resp.index
            )
        )
    }
}

/**
 * Moves a course within the terms.
 * @param id The ID of the course to move.
 * @param index The index of the destination.
 * @param destTerm The destination term (if it is different from the current
 * term.)
 */
export function movePlannerCourse(
    id: string,
    index: number,
    destTerm?: string
) {
    return async (
        dispatch: ThunkDispatch<RootState, void, AnyAction>
    ): Promise<AnyAction> => {
        const resp = await movePlannerCourseAPI({ index, term: destTerm }, id)
        return dispatch(movePlannerCourseAction(id, index, destTerm))
    }
}

/**
 * Deletes a course.
 * @param id The ID of the course to delete.
 */
export function deletePlannerCourse(id: string) {
    return async (
        dispatch: ThunkDispatch<RootState, void, AnyAction>
    ): Promise<AnyAction> => {
        try {
            const resp = await deletePlannerCourseAPI(id)
        } catch (err) {
            if (err.response) {
                // Server responded with an invalid code
            }
        }
        return dispatch(deletePlannerCourseAction(id))
    }
}
