import { Course } from 'reducers/types'
import { ActionType, Action } from 'actions/types'
import { deleteFromDictionary } from 'reducers/helpers'

/** The state for the course reducer. */
export interface CourseReducerState {
    [id: string]: Course
}

export function courseReducer (
    state: CourseReducerState = {},
    action: Action
): CourseReducerState {
    switch (action.type) {
    case ActionType.ADD_COURSE:
        return {
            ...state,
            [action.payload.termID]: action.payload.course
        }
    case ActionType.DELETE_COURSE:
        return deleteFromDictionary(state, action.payload.course)
    default:
        return state
    }
}

export default courseReducer
