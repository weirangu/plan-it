import { ActionType } from 'actions/types/actionTypes'
import {
    DeletePlannedCourseAction,
    MovePlannedCourseAction,
    PlannedCoursePayload,
    UpdatePlannedCourseAction
} from 'actions/types/plannedCourseTypes'
import store from 'store'

/** Updates or adds a course in the plan. */
export function updatePlannedCourseAction (
    payload: PlannedCoursePayload
): UpdatePlannedCourseAction {
    return { type: ActionType.UPDATE_PLANNED_COURSE, payload: payload }
}

export function movePlannedCourseAction (payload: {
id: string
index: number
destTerm?: string
}): MovePlannedCourseAction {
    return {
        type: ActionType.MOVE_PLANNED_COURSE,
        payload: {
            sourceTerm: store.getState().courses[payload.id].term,
            ...payload
        }
    }
}

/** Deletes a course in the plan. */
export function deleteCourseAction (id: string): DeletePlannedCourseAction {
    return {
        type: ActionType.DELETE_PLANNED_COURSE,
        payload: {
            id: id,
            term: store.getState().courses[id].term
        }
    }
}
