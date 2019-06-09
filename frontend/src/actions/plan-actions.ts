import { ActionType, PlanPayload, PlanAction } from 'actions/action-types'

/** Sets the current plan. */
export function setPlan (payload: PlanPayload): PlanAction {
    return { type: ActionType.SET_PLAN, payload: payload }
}
