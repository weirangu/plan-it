import { RootAction } from 'actions'
import { cacheCourseAction } from 'actions/courseActions'
import { Course } from 'reducers/types'
import { createReducer, Reducer } from 'typesafe-actions'

/** The state for the PlannedCourse reducer. */
export interface CourseReducerState {
    readonly [id: string]: Course
}

export const courseReducer: Reducer<
    CourseReducerState,
    RootAction
> = createReducer({} as CourseReducerState).handleAction(
    cacheCourseAction,
    (state, action) => ({ ...state, [action.payload.id]: action.payload })
)

export default courseReducer
