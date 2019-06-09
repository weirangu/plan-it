import { Action, ActionType } from 'actions/action-types'
import { setPlan } from 'actions/plan-actions'
import { getPlan, makeNewPlan } from 'api/plan'
import { Course, Plan } from 'reducers/state-types'

/**
 * initialState is only undefined when we haven't loaded the data from the
 * backend yet.
 */
const initialState: Plan = getInitialState()

/**
 * Gets the Plan from localStorage, or gets a new one from the backend
 * if one doesn't exist.
 */
function getInitialState (): Plan {
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

export function rootReducer (state: Plan = initialState, action: Action): Plan {
    switch (action.type) {
    case ActionType.ADD_COURSE:
        const termCourses: Course[] =
                state.terms[action.payload.termID].courses
        termCourses.push(action.payload.course)
        return {
            name: state.name,
            terms: {
                ...state.terms,
                [action.payload.termID]: {
                    name: state.terms[action.payload.termID].name,
                    courses: termCourses
                }
            },
            id: state.id
        }
    case ActionType.MOVE_COURSE:
        const { oldIndex, oldTermID, newTermID, newIndex } = action.payload
        const oldItems: Array<Course> = Array.from(
            state.terms[oldTermID].courses
        )

        // A copy is made because the state is immutable
        const termCopy = { ...state.terms }
        if (oldTermID === newTermID) {
            // Removes the course from the array
            const removed: Course[] = oldItems.splice(oldIndex, 1)

            // Adds the course into the array at the new location
            oldItems.splice(newIndex, 0, ...removed)

            termCopy[oldTermID].courses = oldItems
            return {
                name: state.name,
                terms: termCopy,
                id: state.id
            }
        } else {
            const source: Course[] = Array.from(
                state.terms[oldTermID].courses
            )
            const dest: Course[] = Array.from(
                state.terms[newTermID].courses
            )

            // Removes the course from the old term.
            const removed: Course[] = source.splice(oldIndex, 1)

            // Adds the course to the new term
            dest.splice(newIndex, 0, ...removed)

            termCopy[oldTermID].courses = source
            termCopy[newTermID].courses = dest
            return {
                name: state.name,
                terms: termCopy,
                id: state.id
            }
        }
    case ActionType.DELETE_COURSE:
        const courses: Course[] = [
            ...state.terms[action.payload.termID].courses
        ]

        courses.splice(action.payload.index, 1)
        return {
            name: state.name,
            terms: {
                ...state.terms,
                [action.payload.termID]: {
                    ...state.terms[action.payload.termID],
                    courses: courses
                }
            },
            id: state.id
        }
    case ActionType.ADD_TERM:
        const newTerm = {
            name: action.payload.name,
            courses: []
        }
        return {
            name: state.name,
            terms: {
                ...state.terms,
                [action.payload.termID]: newTerm
            },
            id: state.id
        }
    case ActionType.DELETE_TERM:
        const terms = Object.assign({}, state.terms) // Makes a copy
        delete terms[action.payload.termID]
        return {
            name: state.name,
            terms: terms,
            id: state.id
        }
    case ActionType.SET_PLAN:
        return action.payload.plan
    default:
        return state
    }
}

export default rootReducer
