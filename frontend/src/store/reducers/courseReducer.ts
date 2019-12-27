import { cacheCourseAction } from 'store/actions/courseActions'
import { Course } from 'store/reducers/types'
import { createReducer } from 'typesafe-actions'
import { AnyAction } from 'redux'

/** The state for the PlannerCourse reducer. */
export interface CourseReducerState {
    readonly [id: string]: Course
}

export const courseReducer = createReducer<CourseReducerState, AnyAction>(
    {} as CourseReducerState
).handleAction(cacheCourseAction, (state, action) => ({
    ...state,
    [action.payload.id]: action.payload
}))

export default courseReducer
