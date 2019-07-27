import { cacheCourseAction } from 'actions/courseActions'
import { Course } from 'reducers/types'
import { createReducer } from 'typesafe-actions'
import { RootAction } from 'actions'

/** The state for the PlannerCourse reducer. */
export interface CourseReducerState {
    readonly [id: string]: Course
}

export const courseReducer = createReducer<CourseReducerState, RootAction>(
    {} as CourseReducerState
).handleAction(cacheCourseAction, (state, action) => ({
    ...state,
    [action.payload.id]: action.payload
}))

export default courseReducer
