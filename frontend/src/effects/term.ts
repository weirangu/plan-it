import { updatePlannerCourseAction } from 'actions/plannerCourseActions'
import { deleteTermAction, updateTermAction } from 'actions/termActions'
import { deleteTermAPI, newTermAPI } from 'api/term'
import { APIRequestTerm } from 'api/types/requestTypes'
import {
    APIResponsePlannerCourse,
    APIResponseTerm
} from 'api/types/responseTypes'
import { batch } from 'react-redux'
import { RootState } from 'reducers/types'
import { AnyAction, Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

/**
 * Updates a Term and the corresponding PlannerCourses from a APIResponseTerm.
 * @param term The response from the API.
 * @param dispatch The function used to dispatch actions.
 */
export function updateTerm(
    term: APIResponseTerm,
    dispatch: Dispatch<AnyAction>
): void {
    dispatch(
        updateTermAction(
            term.id,
            term.name,
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
    return async (
        dispatch: ThunkDispatch<RootState, void, AnyAction>
    ): Promise<void> => {
        const resp = await newTermAPI(term)
        batch(() => updateTerm(resp, dispatch))
    }
}

/**
 * Deletes a term from the plan.
 * @param id The ID of the plan to delete.
 */
export function deleteTerm(id: string) {
    return async (dispatch: Dispatch<AnyAction>): Promise<AnyAction> => {
        const resp = await deleteTermAPI(id)
        return dispatch(deleteTermAction(id))
    }
}
