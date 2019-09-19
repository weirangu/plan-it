import { getPlanAPI, newPlanAPI } from 'api/plan'
import { newTermAPI } from 'api/term'
import { APIRequestPlan } from 'api/types/requestTypes'
import { APIResponsePlan, APIResponseTerm } from 'api/types/responseTypes'
import { batch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'
import { newPlanAction, updatePlanAction } from 'store/actions/planActions'
import { updateTerm } from 'store/effects/term'
import { TermMonth } from 'store/reducers/types'

/**
 * Updates a Plan and the corresponding Term and PlannerCourse from a
 * APIResponsePlan. Can be batched using React Redux.
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

/**
 * Gets the Redux plan with the data of a plan from the API.
 * @param id The ID of the plan to set.
 */
export function getPlan(id: string) {
    return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        try {
            const resp = await getPlanAPI(id)
            batch(() => updatePlan(resp, dispatch))
        } catch (err) {
            // The request wasn't successful
            console.error(err)
        }
    }
}

/**
 * Sets the Redux plan with the data of a new plan from the API.
 * @param plan The new plan to POST to the backend.
 * @param year The year of the first term in the plan.
 * @param month The month of the first term in the plan.
 */
export function newPlan(plan: APIRequestPlan, year: number, month: TermMonth) {
    return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        try {
            const planResp = await newPlanAPI(plan)
            const termResp = await newTermAPI({
                year,
                month,
                plan: planResp.id
            })
            const terms = [
                // planResp.terms should be empty
                ...planResp.terms.map((val: APIResponseTerm) => val.id),
                termResp.id
            ]
            dispatch(
                newPlanAction({
                    ...planResp,
                    terms
                })
            )
            batch(() => {
                planResp.terms.forEach((term: APIResponseTerm) =>
                    updateTerm(term, dispatch)
                )
                updateTerm(termResp, dispatch)
            })
        } catch (err) {
            // There was an error with either the Plan request or the Term
            // request
            console.error(err)
        }
    }
}
