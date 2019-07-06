import { updatePlanAction } from 'actions/planActions'
import { deleteTermAction, updateTermAction } from 'actions/termActions'
import { Plan } from 'reducers/types'
import { createReducer, Reducer } from 'typesafe-actions'
import { RootAction } from 'actions'

const initialState: Plan = {
    terms: [],
    name: 'Default Plan'
}

export const planReducer: Reducer<Plan, RootAction> = createReducer(
    initialState
)
    .handleAction(updatePlanAction, (state, action) => action.payload)
    .handleAction(updateTermAction, (state, action) => {
        if (
            state.terms.find((term: string) => action.payload.id === term) !==
            undefined
        ) {
            return state
        }
        const stateCopy = { ...state }
        stateCopy.terms = [...stateCopy.terms]
        stateCopy.terms.push(action.payload.id)
        return stateCopy
    })
    .handleAction(deleteTermAction, (state, action) => {
        const stateCopy = { ...state }
        stateCopy.terms = [...stateCopy.terms]
        stateCopy.terms.splice(stateCopy.terms.indexOf(action.payload.id), 1)
        return stateCopy
    })

export default planReducer
