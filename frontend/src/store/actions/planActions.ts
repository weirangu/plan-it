import { Plan } from 'store/reducers/types'
import { createAction } from 'typesafe-actions'

/**
 * Updates the current plan.
 * @param plan The information of the Plan to update. The ID in the plan object
 * will be used to identify which Plan to update in the state.
 * */
export const updatePlanAction = createAction('UPDATE_PLAN')<Plan>()

/**
 * Adds a plan to the state.
 * @param plan The information of the Plan to update.
 * @param index Optional, the index to put the plan. If not provided, the Plan
 * is added to the end of the current array of plans.
 */
export const newPlanAction = createAction(
    'NEW_PLAN',
    (plan: Plan, index?: number) => ({
        plan,
        index
    })
)()
