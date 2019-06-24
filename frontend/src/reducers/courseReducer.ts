import { Action, ActionType } from 'actions/types/actionTypes'
import { deleteFromDictionary } from 'reducers/helpers'
import { PlannedCourse } from 'reducers/types'

/** The state for the course reducer. */
export interface CourseReducerState {
    [id: string]: PlannedCourse
}

export function courseReducer (
    state: CourseReducerState = {},
    action: Action
): CourseReducerState {
    switch (action.type) {
    case ActionType.UPDATE_PLANNED_COURSE:
        return {
            ...state,
            [action.payload.id]: action.payload
        }
    case ActionType.MOVE_PLANNED_COURSE:
        if (action.payload.destTerm !== undefined) {
            const movedCourse = { ...state[action.payload.id] }
            movedCourse.term = action.payload.destTerm
            return {
                ...state,
                [action.payload.id]: movedCourse
            }
        }
        // If we're here, then the term of the course never changed, so the
        // course doesn't need to change.
        return state
    case ActionType.DELETE_PLANNED_COURSE:
        return deleteFromDictionary(state, action.payload.id)
    case ActionType.DELETE_TERM:
        const stateCopy = { ...state }
        for (const id in state) {
            if (state[id].term === action.payload.id) {
                delete stateCopy[id]
            }
        }
        return stateCopy
    default:
        return state
    }
}

export default courseReducer
