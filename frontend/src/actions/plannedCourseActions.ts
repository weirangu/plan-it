import store from 'store'
import { createAction } from 'typesafe-actions'

/** Updates or adds a course in the plan. */
export const updatePlannedCourseAction = createAction(
    'UPDATE_PLANNED_COURSE',
    action => (course: string, term: string, id: string, index: number) =>
        action({ course, term, id, index })
)

/** Moves a PlannedCourse in the plan. */
export const movePlannedCourseAction = createAction(
    'MOVE_PLANNED_COURSE',
    action => (id: string, index: number, destTerm?: string) =>
        action({
            sourceTerm: store.getState().plannedCourses[id].term,
            id,
            index,
            destTerm
        })
)

/** Deletes a course in the plan. */
export const deletePlannedCourseAction = createAction(
    'DELETE_PLANNED_COURSE',
    action => (id: string) =>
        action({
            id,
            term: store.getState().plannedCourses[id].term
        })
)
