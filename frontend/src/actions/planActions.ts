import { ActionType } from 'actions/types/actionTypes'
import { UpdatePlan } from 'actions/types/planTypes'
import { ID, Plan } from 'reducers/types'

/** Updates the current plan. */
export function updatePlanAction (payload: Plan & ID): UpdatePlan {
    return { type: ActionType.UPDATE_PLAN, payload: payload }
}
