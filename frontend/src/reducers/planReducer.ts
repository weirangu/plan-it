import { Action, ActionType } from 'actions/types'
import { Plan } from 'reducers/types'

const initialState: Plan = {
    terms: {},
    name: 'Default Plan'
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
