import { ActionType, PlanPayload, PlanAction } from 'actions/types'

/** Sets the current plan. */
export function setPlan (payload: PlanPayload): PlanAction {
    return { type: ActionType.SET_PLAN, payload: payload }
}
