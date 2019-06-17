import { setPlan } from 'actions/plan-actions'
import { getPlan, newPlan } from 'api/plan'
import { Plan } from 'reducers/types'
import { AnyAction, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

/**
 * Sets the Redux plan with the data of a plan from the API.
 * @param id The ID of the plan to set.
 */
export function setPlanFromAPI (id: string) {
    return async (
        dispatch: Dispatch<AnyAction>,
        getState: () => Plan
    ): Promise<AnyAction> => {
        const resp = await getPlan(id)
        return dispatch(setPlan({ plan: resp.data }))
    }
}

/**
 * Sets the Redux plan with the data of a new plan from the API.
 * @param plan The new plan to POST to the backend.
 */
export function newPlanFromAPI (
    plan: Plan
): ThunkAction<Promise<AnyAction>, Plan, void, AnyAction> {
    return async (dispatch, getState): Promise<AnyAction> => {
        const resp = await newPlan(plan)
        return dispatch(setPlan({ plan: resp.data }))
    }
}
