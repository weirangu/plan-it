import {
    ActionType,
    AddTermPayload,
    DeleteTermPayload,
    AddTermAction,
    DeleteTermAction
} from 'actions/action-types'

/** Adds a term to the plan. */
export function addTerm (payload: AddTermPayload): AddTermAction {
    return { type: ActionType.ADD_TERM, payload: payload }
}

/** Deletes a term in the plan. */
export function deleteTerm (payload: DeleteTermPayload): DeleteTermAction {
    return { type: ActionType.DELETE_TERM, payload: payload }
}
