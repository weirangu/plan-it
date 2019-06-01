import {
    ActionType,
    AddCourseAction,
    AddCoursePayload,
    DeleteCoursePayload,
    MoveCourseAction,
    MoveCoursePayload,
    DeleteCourseAction
} from 'actions/action-types'

/** Adds a course to the plan. */
export function addCourse (payload: AddCoursePayload): AddCourseAction {
    return { type: ActionType.ADD_COURSE, payload: payload }
}

/** Moves a course in the plan. */
export function moveCourse (payload: MoveCoursePayload): MoveCourseAction {
    return {
        type: ActionType.MOVE_COURSE,
        payload: payload
    }
}

/** Deletes a course in the plan. */
export function deleteCourse (payload: DeleteCoursePayload): DeleteCourseAction {
    return {
        type: ActionType.DELETE_COURSE,
        payload: payload
    }
}
