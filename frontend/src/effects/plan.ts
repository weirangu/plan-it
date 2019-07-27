import { updatePlanAction, newPlanAction } from 'actions/planActions'
import { getPlanAPI, newPlanAPI } from 'api/plan'
import { APIRequestPlan } from 'api/types/requestTypes'
import { APIResponsePlan, APIResponseTerm } from 'api/types/responseTypes'
import { updateTerm } from 'effects/term'
import { batch } from 'react-redux'
import { RootState } from 'reducers/types'
import { AnyAction, Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

/**
 * Gets the Redux plan with the data of a plan from the API.
 * @param id The ID of the plan to set.
 */
export function getPlan(id: string) {
    return async (
        dispatch: ThunkDispatch<RootState, void, AnyAction>
    ): Promise<void> => {
        const resp = await getPlanAPI(id)
        batch(() => updatePlan(resp, dispatch))
    }
}

/**
 * Sets the Redux plan with the data of a new plan from the API.
 * @param plan The new plan to POST to the backend.
 */
export function newPlan(plan: APIRequestPlan) {
    return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        const resp = await newPlanAPI(plan)
        dispatch(
            newPlanAction({
                ...resp,
                terms: resp.terms.map((val: APIResponseTerm) => val.id)
            })
        )
    }
}

/**
 * Updates a Plan and the corresponding Term and PlannerCourse from a
 * APIResponsePlan.
 * @param plan The response from the API.
 * @param dispatch The function used to dispatch actions.
 */
export function updatePlan(
    plan: APIResponsePlan,
    dispatch: Dispatch<AnyAction>
): void {
    dispatch(
        updatePlanAction({
            ...plan,
            terms: plan.terms.map((term: APIResponseTerm) => term.id)
        })
    )
    plan.terms.forEach((term: APIResponseTerm) => updateTerm(term, dispatch))
}
