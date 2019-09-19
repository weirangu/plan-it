import {
    deletePlannerCourseAPI,
    movePlannerCourseAPI,
    newPlannerCourseAPI
} from 'api/plannerCourse'
import { AnyAction, Dispatch } from 'redux'
import {
    deletePlannerCourseAction,
    movePlannerCourseAction,
    updatePlannerCourseAction
} from 'store/actions/plannerCourseActions'
import { RootState } from 'store/reducers/types'

/**
 * Adds a new course to the Redux state, and makes a POST request to the API.
 * @param course The course name to add.
 * @param term The term to add the course to.
 */
export function addPlannerCourse(course: string, term: string) {
    return async (
        dispatch: Dispatch<AnyAction>,
        getState: () => RootState
    ): Promise<AnyAction | void> => {
        // We want our new course at the end of the array
        const { terms } = getState()
        try {
            const resp = await newPlannerCourseAPI({
                course,
                term,
                index: terms[term].courses.length
            })
            // We can't dispatch before the API returns, as we need the course ID
            return dispatch(
                updatePlannerCourseAction(
                    resp.course,
                    resp.term,
                    resp.id,
                    resp.index
                )
            )
        } catch (err) {
            // The request wasn't sent properly
            console.error(err)
        }
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
        dispatch: Dispatch<AnyAction>,
        getState: () => RootState
    ): Promise<void> => {
        const { plannerCourses } = getState()
        dispatch(
            movePlannerCourseAction(
                plannerCourses[id].term,
                id,
                index,
                destTerm
            )
        )
        try {
            await movePlannerCourseAPI({ index, term: destTerm }, id)
        } catch (err) {
            // The request was not sent properly, or a non-200 status code was
            // returned
            console.error(err)
        }
    }
}

/**
 * Deletes a course.
 * @param id The ID of the course to delete.
 */
export function deletePlannerCourse(id: string) {
    return async (
        dispatch: Dispatch<AnyAction>,
        getState: () => RootState
    ): Promise<void> => {
        const { plannerCourses } = getState()
        try {
            await deletePlannerCourseAPI(id)
            dispatch(deletePlannerCourseAction(id, plannerCourses[id].term))
        } catch (err) {
            // The request was not sent properly, or a non-200 status code was
            // returned
            console.error(err)
        }
    }
}
