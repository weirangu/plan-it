import { ActionType } from 'actions/types/actionTypes'
import { Plan } from 'reducers/types'
import { Action } from 'redux'

/** Updates the current plan in Redux. */
export interface UpdatePlan extends Action<ActionType.UPDATE_PLAN> {
    payload: Plan
}
