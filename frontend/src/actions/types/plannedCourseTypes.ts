import { ActionType } from 'actions/types/actionTypes'
import { PlannedCourse } from 'reducers/types'
import { Action as ReduxAction } from 'redux'

/** The action that adds or updates a course in our plan. */
export interface UpdatePlannedCourseAction
    extends ReduxAction<ActionType.UPDATE_PLANNED_COURSE> {
    payload: PlannedCoursePayload
}

/** The payload for most course actions. */
export interface PlannedCoursePayload extends PlannedCourse {
    id: string
    index: number
}

/** The payload for moving a course. */
export interface MovePlannedCoursePayload {
    id: string
    index: number // The new index of the course
    sourceTerm: string
    destTerm?: string // If defined, the term to move the course to.
}

/** The action that moves a course in our plan. */
export interface MovePlannedCourseAction
    extends ReduxAction<ActionType.MOVE_PLANNED_COURSE> {
    payload: MovePlannedCoursePayload
}

/** The payload that is used in a DeleteCourseAction. */
export interface DeletePlannedCoursePayload {
    id: string
    term: string // The term of the course to delete
}

/** The action that deletes a course in our plan. */
export interface DeletePlannedCourseAction
    extends ReduxAction<ActionType.DELETE_PLANNED_COURSE> {
    payload: DeletePlannedCoursePayload
}
