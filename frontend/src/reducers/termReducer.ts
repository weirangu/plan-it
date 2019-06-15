import { Term, Course } from 'reducers/types'
import { Action, ActionType } from 'actions/types'
import { deleteFromDictionary } from './helpers'

/** The state for the term reducer. */
export interface TermReducerState {
    [id: string]: Term
}

export function termReducer (
    state: TermReducerState = {},
    action: Action
): TermReducerState {
    switch (action.type) {
    case ActionType.ADD_TERM:
        return {
            ...state,
            [action.payload.termID]: action.payload.term
        }
    case ActionType.DELETE_TERM:
        return deleteFromDictionary(state, action.payload.termID)
    case ActionType.ADD_COURSE: {
        const term = { ...state[action.payload.termID] }
        term.courses.push(action.payload.course)
        return {
            ...state,
            [action.payload.termID]: term
        }
    }
    case ActionType.DELETE_COURSE: {
        const term = { ...state[action.payload.termID] }
        const index = term.courses.findIndex(
            (val: Course) => val.code === action.payload.course
        )
        term.courses.splice(index, 1)
        return {
            ...state,
            [action.payload.termID]: term
        }
    }
    case ActionType.MOVE_COURSE: {
        const newState = { ...state }
        const [removedCourse] = newState[action.payload.oldTermID]
            .courses.splice(action.payload.oldIndex, 1)
        newState[action.payload.newTermID].courses.splice(
            action.payload.newIndex,
            0,
            removedCourse
        )
        return newState
    }
    default:
        return state
    }
}

export default termReducer
