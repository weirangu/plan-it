import { deleteTermAPI, newTermAPI } from 'api/term'
import { APIRequestTerm } from 'api/types/requestTypes'
import {
    APIResponsePlannerCourse,
    APIResponseTerm
} from 'api/types/responseTypes'
import { batch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'
import { updatePlannerCourseAction } from 'store/actions/plannerCourseActions'
import { deleteTermAction, updateTermAction } from 'store/actions/termActions'
import { RootState } from 'store/reducers/types'

/**
 * Updates a Term and the corresponding PlannerCourses from a APIResponseTerm.
 * Can be batched using React Redux.
 * @param term The response from the API.
 * @param dispatch The function used to dispatch actions.
 */
export function updateTermFromResponse(
    term: APIResponseTerm,
    dispatch: Dispatch<AnyAction>
): void {
    dispatch(
        updateTermAction(
            term.id,
            term.year,
            term.month,
            term.courses.map((course: APIResponsePlannerCourse) => course.id),
            term.plan
        )
    )
    term.courses.forEach((course: APIResponsePlannerCourse) =>
        dispatch(
            updatePlannerCourseAction(
                course.course,
                course.term,
                course.id,
                course.index
            )
        )
    )
}

/**
 * Sets the term in the Redux state with the data of a new term from the API.
 * @param term The information of the new term to send to the backend.
 */
export function newTerm(term: APIRequestTerm) {
    return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        try {
            const resp = await newTermAPI(term)
            batch(() => updateTermFromResponse(resp, dispatch))
        } catch (err) {
            // The request did not succeed
            console.error(err)
        }
    }
}

/**
 * Deletes a term from the plan.
 * @param id The ID of the term to delete.
 */
export function deleteTerm(id: string) {
    return async (
        dispatch: Dispatch<AnyAction>,
        getState: () => RootState
    ): Promise<void> => {
        try {
            const { terms } = getState()
            await deleteTermAPI(id)
            dispatch(deleteTermAction(id, terms[id].plan))
        } catch (err) {
            // The request did not succeed
            console.error(err)
        }
    }
}
