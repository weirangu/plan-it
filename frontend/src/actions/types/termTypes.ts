import { Action } from 'redux'
import { ActionType } from 'actions/types/actionTypes'
import { Term, ID } from 'reducers/types'

/** This action is used for deleting a term. */
export interface DeleteTermAction extends Action<ActionType.DELETE_TERM> {
    payload: ID
}

/** This action is used for updating or adding a term. */
export interface UpdateTermAction extends Action<ActionType.UPDATE_TERM> {
    payload: Term & ID
}
