import { updateTermAction, deleteTermAction } from 'actions/termActions'
import { getTermAPI, newTermAPI, deleteTermAPI } from 'api/term'
import { AnyAction, Dispatch } from 'redux'
import { APIRequestTerm } from 'api/types/requestTypes'
import { State } from 'reducers/types'
import { getPlannedCourse } from 'effects/course'
import { ThunkDispatch } from 'redux-thunk'

/**
 * Adds a Redux term to the provided plan based on the data from the API.
 * @param id The ID of the plan to get.
 */
export function getTerm (id: string) {
    return async (
        dispatch: ThunkDispatch<State, void, AnyAction>,
        getState: () => State
    ): Promise<void> => {
        const resp = await getTermAPI(id)
        dispatch(updateTermAction({ id, ...resp.data }))

        const courses = resp.data.courses
        for (const course of courses) {
            if (!(course in getState().terms)) {
                // We need to get the term from the API
                await dispatch(getPlannedCourse(course))
            }
        }
    }
}

/**
 * Sets the Redux term with the data of a new term from the API.
 * @param name The name of the term and the planID to POST to the backend.
 */
export function newTerm (term: APIRequestTerm) {
    return async (
        dispatch: ThunkDispatch<State, void, AnyAction>
    ): Promise<AnyAction> => {
        const resp = await newTermAPI(term)
        return dispatch(updateTermAction({ id: resp.data.id, ...resp.data }))
    }
}

/**
 * Deletes a term from the plan.
 * @param id The ID of the plan to delete.
 */
export function deleteTerm (id: string) {
    return async (dispatch: Dispatch<AnyAction>): Promise<AnyAction> => {
        const resp = await deleteTermAPI(id)
        return dispatch(deleteTermAction({ id: id }))
    }
}
