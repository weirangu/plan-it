import store from 'store'
import { createAction } from 'typesafe-actions'

/** Updates or adds a course in the plan. */
export const updatePlannerCourseAction = createAction(
    'UPDATE_PLANNED_COURSE',
    action => (course: string, term: string, id: string, index: number) =>
        action({ course, term, id, index })
)

/** Moves a PlannerCourse in the plan. */
export const movePlannerCourseAction = createAction(
    'MOVE_PLANNED_COURSE',
    action => (id: string, index: number, destTerm?: string) =>
        action({
            sourceTerm: store.getState().plannerCourses[id].term,
            id,
            index,
            destTerm
        })
)

/** Deletes a course in the plan. */
export const deletePlannerCourseAction = createAction(
    'DELETE_PLANNED_COURSE',
    action => (id: string) =>
        action({
            id,
            term: store.getState().plannerCourses[id].term
        })
)
