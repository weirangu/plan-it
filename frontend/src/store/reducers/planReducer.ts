import { RootAction } from 'store/actions'
import { newPlanAction, updatePlanAction } from 'store/actions/planActions'
import { deleteTermAction, updateTermAction } from 'store/actions/termActions'
import { addAtIndex, replaceAtIndex } from 'store/reducers/helpers'
import { Plan } from 'store/reducers/types'
import { createReducer } from 'typesafe-actions'

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
                ...state.slice(planIndex + 1)
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
        const planIndex = state.findIndex(
            (val: Plan) => val.id === action.payload.plan
        )
        if (planIndex === -1) {
            return state
        }
        const termIndex = state[planIndex].terms.findIndex(
            (term: string) => action.payload.id === term
        )
        if (termIndex === -1) {
            return state
        }

        const newTerm = [
            ...state[planIndex].terms.slice(0, termIndex),
            ...state[planIndex].terms.slice(termIndex + 1)
        ]
        return [
            ...state.slice(0, planIndex),
            { ...state[planIndex], terms: newTerm },
            ...state.slice(planIndex + 1)
        ]
    })

export default planReducer
