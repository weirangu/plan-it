import { Action, ActionType } from 'actions/types/actionTypes'
import { Plan } from 'reducers/types'

const initialState: Plan = {
    terms: [],
    name: 'Default Plan'
}

export function planReducer (state: Plan = initialState, action: Action): Plan {
    switch (action.type) {
    case ActionType.UPDATE_TERM: {
        const stateCopy = { ...state }
        stateCopy.terms = [...stateCopy.terms]
        stateCopy.terms.push(action.payload.id)
        return stateCopy
    }
    case ActionType.DELETE_TERM: {
        const stateCopy = { ...state }
        stateCopy.terms = [...stateCopy.terms]
        stateCopy.terms.splice(
            stateCopy.terms.indexOf(action.payload.id),
            1
        )
        return stateCopy
    }
    case ActionType.UPDATE_PLAN:
        return action.payload
    default:
        return state
    }
}

export default planReducer
