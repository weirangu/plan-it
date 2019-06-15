import { Action } from 'redux'
import { Course, Plan, Term } from 'reducers/types'

/**
 * All the possible redux actions for this web app. This type is different from
 * Action<>, as Action<> is defined in redux.
 */
export type Action =
    | AddCourseAction
    | MoveCourseAction
    | DeleteCourseAction
    | AddTermAction
    | DeleteTermAction
    | PlanAction

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

/** This action is used for adding a term. */
export interface AddTermAction extends Action<ActionType.ADD_TERM> {
    payload: AddTermPayload
}

/** This action is used for deleting a term. */
export interface DeleteTermAction extends Action<ActionType.DELETE_TERM> {
    payload: DeleteTermPayload
}

export interface PlanAction extends Action<ActionType.SET_PLAN> {
    payload: PlanPayload
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
    course: string
    termID: string
}

/** The payload for deleting a term. */
export interface DeleteTermPayload {
    termID: string // The termID to add/delete
}

/** The payload for adding a term. */
export interface AddTermPayload {
    term: Term // The data of the Term to add
    termID: string // The termID to add/delete
}

/** The payload for operations on plans. */
export interface PlanPayload {
    plan: Plan
}

/** An enum of possible actions in Redux. */
export enum ActionType {
    ADD_COURSE = 'ADD_COURSE',
    MOVE_COURSE = 'MOVE_COURSE',
    DELETE_COURSE = 'DELETE_COURSE',
    ADD_TERM = 'ADD_TERM',
    DELETE_TERM = 'DELETE_TERM',
    SET_PLAN = 'SET_PLAN'
}
