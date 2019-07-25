import { Plan } from 'reducers/types'
import { createAction } from 'typesafe-actions'

/**
 * Updates the current plan. index is the index of the plan in the state to
 * update.
 * */
export const updatePlanAction = createAction(
    'UPDATE_PLAN',
    action => (plan: Plan) => action(plan)
)

/** Adds a plan to the state. */
export const newPlanAction = createAction(
    'NEW_PLAN',
    action => (plan: Plan, index?: number) => action({ plan, index })
)
