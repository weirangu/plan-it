import { Action, ActionType } from 'actions/types'
import { getPlan, makeNewPlan } from 'api/plan'
import { setPlan } from 'actions/plan-actions'
import { Plan } from 'reducers/types'

const initialState: Plan = getInitialPlan()

/**
 * Gets the Plan from localStorage, or gets a new one from the backend
 * if one doesn't exist.
 */
function getInitialPlan (): Plan {
    let id: string | null = localStorage.getItem('planID')
    const emptyPlan = {
        terms: {},
        name: 'Default Plan'
    }

    if (id !== null) {
        // We get an existing plan from the server
        getPlan(id)
            .then(resp => setPlan({ plan: resp.data }))
            .catch(err => console.log(err))
    } else {
        // We make a new plan
        makeNewPlan(emptyPlan)
            .then(resp => setPlan({ plan: resp.data }))
            .catch(err => console.log(err))
    }
    return emptyPlan
}

export function planReducer (state: Plan = initialState, action: Action): Plan {
    switch (action.type) {
    case ActionType.SET_PLAN:
        return action.payload.plan
    default:
        return state
    }
}

export default planReducer
