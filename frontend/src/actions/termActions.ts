import { ActionType } from 'actions/types/actionTypes'
import { ID, Term } from 'reducers/types'
import { DeleteTermAction, UpdateTermAction } from './types/termTypes'

/** Deletes a term in the plan. */
export function deleteTermAction (payload: ID): DeleteTermAction {
    return { type: ActionType.DELETE_TERM, payload: payload }
}

/** Updates or adds a term in the plan. */
export function updateTermAction (payload: Term & ID): UpdateTermAction {
    return { type: ActionType.UPDATE_TERM, payload: payload }
}
