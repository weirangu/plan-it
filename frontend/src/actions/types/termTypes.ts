import { ActionType } from 'actions/types/actionTypes'
import { ID, Term } from 'reducers/types'
import { Action } from 'redux'

/** This action is used for deleting a term. */
export interface DeleteTermAction extends Action<ActionType.DELETE_TERM> {
    payload: ID
}

/** This action is used for updating or adding a term. */
export interface UpdateTermAction extends Action<ActionType.UPDATE_TERM> {
    payload: Term & ID
}
