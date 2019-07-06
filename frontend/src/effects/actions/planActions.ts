import { Plan } from 'reducers/types'
import { createAction } from 'typesafe-actions'

/** Updates the current plan. */
export const updatePlanAction = createAction(
    'UPDATE_PLAN',
    action => (id: string, plan: Plan) => action({ id, ...plan })
)
