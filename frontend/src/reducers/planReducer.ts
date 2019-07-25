import { updatePlanAction, newPlanAction } from 'actions/planActions'
import { deleteTermAction, updateTermAction } from 'actions/termActions'
import { Plan } from 'reducers/types'
import { createReducer } from 'typesafe-actions'
import { RootAction } from 'actions'
import { addAtIndex, replaceAtIndex } from './helpers'

export type PlanReducerState = Plan[]

export const planReducer = createReducer<PlanReducerState, RootAction>(
    [] as PlanReducerState
)
    .handleAction(updatePlanAction, (state, action) => {
        const planIndex = state.findIndex(
            (val: Plan) => val.id === action.payload.id
        )
        if (planIndex === -1) {
            return [...state, action.payload]
        } else {
            return [
                ...state.slice(0, planIndex),
                action.payload,
                ...state.slice(planIndex)
            ]
        }
    })
    .handleAction(newPlanAction, (state, action) => {
        if (action.payload.index === undefined) {
            return [...state, action.payload.plan]
        } else {
            return addAtIndex(state, action.payload.index, action.payload.plan)
        }
    })
    .handleAction(updateTermAction, (state, action) => {
        const index = state.findIndex(
            (val: Plan) => val.id === action.payload.plan
        )
        if (
            index === -1 ||
            state[index].terms.find(
                (term: string) => action.payload.id === term
            ) !== undefined
        ) {
            return state
        }
        return replaceAtIndex(state, index, {
            ...state[index],
            terms: [...state[index].terms, action.payload.id]
        })
    })
    .handleAction(deleteTermAction, (state, action) => {
        const index = state.findIndex(
            (val: Plan) => val.id === action.payload.id
        )
        if (index === -1) {
            return state
        }
        const termIndex = state[index].terms.findIndex(
            (term: string) => action.payload.id === term
        )
        if (termIndex === -1) {
            return state
        }
        return [...state.slice(0, index), ...state.slice(index + 1)]
    })

export default planReducer
