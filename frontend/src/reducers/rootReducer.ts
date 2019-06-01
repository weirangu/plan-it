import { Action, ActionType } from 'actions/action-types'
import { Plan, Terms, Course } from 'reducers/state-types'

const initialState: Plan = {
    name: 'Default Plan',
    terms: {
        20199: [{ code: 'csc108' }, { code: 'csc148' }, { code: 'csc207' }],
        20201: [{ code: 'csc209' }, { code: 'csc369' }, { code: 'csc469' }]
    }
}

export function rootReducer (state: Plan = initialState, action: Action): Plan {
    switch (action.type) {
    case ActionType.ADD_COURSE:
        const newTerm = [
            ...state.terms[action.payload.termID],
            action.payload.course
        ]
        return {
            name: state.name,
            terms: {
                ...state.terms,
                [action.payload.termID]: newTerm
            }
        }
    case ActionType.MOVE_COURSE:
        const { oldIndex, oldTermID, newTermID, newIndex } = action.payload
        const oldItems: Array<Course> = Array.from(state.terms[oldTermID])

        // A copy is made because the state is immutable
        const termCopy = { ...state.terms }
        if (oldTermID === newTermID) {
            // Removes the course from the array
            const removed: Course[] = oldItems.splice(oldIndex, 1)

            // Adds the course into the array at the new location
            oldItems.splice(newIndex, 0, ...removed)

            termCopy[oldTermID] = oldItems
            return {
                name: state.name,
                terms: termCopy
            }
        } else {
            const source: Course[] = Array.from(state.terms[oldTermID])
            const dest: Course[] = Array.from(state.terms[newTermID])

            // Removes the course from the old term.
            const removed: Course[] = source.splice(oldIndex, 1)

            // Adds the course to the new term
            dest.splice(newIndex, 0, ...removed)

            termCopy[oldTermID] = source
            termCopy[newTermID] = dest
            return {
                name: state.name,
                terms: termCopy
            }
        }
    case ActionType.DELETE_COURSE:
        const term: Course[] = [...state.terms[action.payload.termID]]

        term.splice(action.payload.index, 1)
        return {
            name: state.name,
            terms: {
                ...state.terms,
                [action.payload.termID]: term
            }
        }
    case ActionType.ADD_TERM:
        return {
            name: state.name,
            terms: {
                ...state.terms,
                [action.payload.termID]: []
            }
        }
    case ActionType.DELETE_TERM:
        var terms: Terms = Object.assign({}, state.terms)
        delete terms[action.payload.termID]
        return {
            name: state.name,
            terms: terms
        }
    default:
        return state
    }
}

export default rootReducer
