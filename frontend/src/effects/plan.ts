import { updatePlanAction } from 'actions/planActions'
import { getPlanAPI, newPlanAPI } from 'api/plan'
import { APIRequestPlan } from 'api/types/requestTypes'
import { getTerm } from 'effects/term'
import { State } from 'reducers/types'
import { AnyAction, Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

/**
 * Gets the Redux plan with the data of a plan from the API.
 * @param id The ID of the plan to set.
 */
export function getPlan (id: string) {
    return async (
        dispatch: ThunkDispatch<State, void, AnyAction>,
        getState: () => State
    ): Promise<AnyAction> => {
        const resp = await getPlanAPI(id)
        const terms = resp.data.terms
        for (const term of terms) {
            if (!(term in getState().terms)) {
                // We need to get the term from the API
                await dispatch(getTerm(term))
            }
        }
        return dispatch(updatePlanAction(resp.data))
    }
}

/**
 * Sets the Redux plan with the data of a new plan from the API.
 * @param plan The new plan to POST to the backend.
 */
export function newPlan (plan: APIRequestPlan) {
    return async (dispatch: Dispatch<AnyAction>): Promise<AnyAction> => {
        const resp = await newPlanAPI(plan)
        return dispatch(updatePlanAction(resp.data))
    }
}
