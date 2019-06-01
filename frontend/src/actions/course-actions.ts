import {
    ActionType,
    AddCourseAction,
    AddCoursePayload,
    MoveCourseAction,
    MoveCoursePayload
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
