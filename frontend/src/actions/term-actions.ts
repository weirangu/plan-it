import { ActionType, TermPayload, TermAction } from 'actions/action-types'

/** Adds a term to the plan. */
export function addTerm (payload: TermPayload): TermAction {
    return { type: ActionType.ADD_TERM, payload: payload }
}

/** Deletes a term in the plan. */
export function deleteTerm (payload: TermPayload): TermAction {
    return { type: ActionType.DELETE_TERM, payload: payload }
}

