import {
    DeletePlannedCourseAction,
    MovePlannedCourseAction,
    UpdatePlannedCourseAction
} from 'actions/types/plannedCourseTypes'
import { UpdatePlan } from './planTypes'
import { DeleteTermAction, UpdateTermAction } from './termTypes'

/**
 * All possible action types for the Redux store.
 */
export type Action =
    | UpdatePlannedCourseAction
    | MovePlannedCourseAction
    | DeletePlannedCourseAction
    | DeleteTermAction
    | UpdateTermAction
    | UpdatePlan

/** An enum of possible actions in Redux. */
export enum ActionType {
    UPDATE_PLANNED_COURSE = 'UPDATE_PLANNED_COURSE',
    MOVE_PLANNED_COURSE = 'MOVE_PLANNED_COURSE',
    DELETE_PLANNED_COURSE = 'DELETE_PLANNED_COURSE',
    UPDATE_TERM = 'UPDATE_TERM',
    DELETE_TERM = 'DELETE_TERM',
    UPDATE_PLAN = 'UPDATE_PLAN'
}
