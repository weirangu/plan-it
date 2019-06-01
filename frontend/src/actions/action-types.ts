import { Action } from 'redux'
import { Course } from 'reducers/state-types'

/**
 * All the possible redux actions for this web app. This type is different from
 * Action<>, as Action<> is defined in redux.
 */
export type Action =
    | AddCourseAction
    | MoveCourseAction
    | DeleteCourseAction
    | TermAction

/** The action that adds a course to our plan. */
export interface AddCourseAction extends Action<ActionType.ADD_COURSE> {
    payload: AddCoursePayload
}

/** The action that moves a course in our plan. */
export interface MoveCourseAction extends Action<ActionType.MOVE_COURSE> {
    payload: MoveCoursePayload
}

/** The action that deletes a course in our plan. */
export interface DeleteCourseAction extends Action<ActionType.DELETE_COURSE> {
    payload: DeleteCoursePayload
}

/**
 * This action is used for both adding or deleting terms (as the payload for
 * both are the same.)
 */
export interface TermAction
    extends Action<ActionType.ADD_TERM | ActionType.DELETE_TERM> {
    payload: TermPayload
}

/** The payload for adding a course. */
export interface AddCoursePayload {
    course: Course
    termID: string // The term to add the course to
}

/** The payload for moving a course. */
export interface MoveCoursePayload {
    oldIndex: number // The index of the course to move in oldTermID
    oldTermID: string
    newTermID: string
    newIndex: number // Where to put the course in newTermID
}

/** The payload for deleting a course. */
export interface DeleteCoursePayload {
    index: number
    termID: string
}

/** The payload for operations on terms. */
export interface TermPayload {
    termID: string // The termID to add/delete
}

/** An enum of possible actions in Redux. */
export enum ActionType {
    ADD_COURSE = 'ADD_COURSE',
    MOVE_COURSE = 'MOVE_COURSE',
    DELETE_COURSE = 'DELETE_COURSE',
    ADD_TERM = 'ADD_TERM',
    DELETE_TERM = 'DELETE_TERM'
}
