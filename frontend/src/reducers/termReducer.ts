import { Term } from 'reducers/types'
import { Action, ActionType } from 'actions/types/actionTypes'
import { deleteFromDictionary } from 'reducers/helpers'

/** The state for the term reducer. */
export interface TermReducerState {
    [id: string]: Term
}

export function termReducer (
    state: TermReducerState = {},
    action: Action
): TermReducerState {
    switch (action.type) {
    case ActionType.UPDATE_TERM:
        const stateCopy = { ...state }
        stateCopy[action.payload.id] = action.payload
        return stateCopy
    case ActionType.DELETE_TERM:
        return deleteFromDictionary(state, action.payload.id)
    case ActionType.UPDATE_PLANNED_COURSE: {
        if (
            state[action.payload.term].courses.find(
                (course: string) => action.payload.id === course
            ) !== undefined
        ) {
            return state
        }
        const term = { ...state[action.payload.term] }
        const stateCopy = { ...state }

        term.courses[action.payload.index] = action.payload.id
        stateCopy[action.payload.id] = term
        return stateCopy
    }
    case ActionType.DELETE_PLANNED_COURSE: {
        const term = { ...state[action.payload.term] }
        const index = term.courses.findIndex(
            (val: string) => val === action.payload.id
        )
        term.courses.splice(index, 1)
        return {
            ...state,
            [action.payload.id]: term
        }
    }
    case ActionType.MOVE_PLANNED_COURSE: {
        const updatedState = { ...state }
        const sourceTerm = updatedState[action.payload.sourceTerm]
        const sourceIndex = sourceTerm.courses.findIndex(
            (val: string) => val === action.payload.id
        )
        const [removedCourse] = sourceTerm.courses.splice(sourceIndex, 1)
        if (action.payload.destTerm === undefined) {
            // We're not changing terms
            updatedState[action.payload.sourceTerm].courses.splice(
                action.payload.index,
                0,
                removedCourse
            )
        } else {
            // We are changing terms
            updatedState[action.payload.destTerm].courses.splice(
                action.payload.index,
                0,
                removedCourse
            )
        }
        return updatedState
    }
    default:
        return state
    }
}

export default termReducer
