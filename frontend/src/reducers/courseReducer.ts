import {
    deletePlannedCourseAction,
    movePlannedCourseAction,
    updatePlannedCourseAction
} from 'actions/plannedCourseActions'
import { deleteTermAction } from 'actions/termActions'
import { deleteFromDictionary, updateDictionary } from 'reducers/helpers'
import { PlannedCourse, Course } from 'reducers/types'
import { createReducer, Reducer } from 'typesafe-actions'
import { RootAction } from 'actions'
import { cacheCourseAction } from 'actions/courseActions'

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
