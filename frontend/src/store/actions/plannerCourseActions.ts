import { createAction } from 'typesafe-actions'

/**
 * Updates or adds a course in the plan.
 * @param course The name of the course to update/add.
 * @param term The ID of the term that this course will be under.
 * @param id The ID of this PlannerCourse.
 * @param index The index of this PlannerCourse under the term.
 */
export const updatePlannerCourseAction = createAction(
    'UPDATE_PLANNED_COURSE',
    action => (course: string, term: string, id: string, index: number) =>
        action({ course, term, id, index })
)

/**
 * Moves a PlannerCourse in the plan.
 * @param sourceTerm The term that the PlannerCourse originated in.
 * @param id The ID of the PlannerCourse to move.
 * @param index The index to move the PlannerCourse to.
 * @param destTerm The destination term to move the PlannerCourse to (if we're
 * moving the course across terms).
 */
export const movePlannerCourseAction = createAction(
    'MOVE_PLANNED_COURSE',
    action => (
        sourceTerm: string,
        id: string,
        index: number,
        destTerm?: string
    ) =>
        action({
            sourceTerm,
            id,
            index,
            destTerm
        })
)

/**
 * Deletes a course in the plan.
 * @param id The ID of the PlannerCourse to delete.
 * @param term The term that the PlannerCourse belonged to.
 */
export const deletePlannerCourseAction = createAction(
    'DELETE_PLANNED_COURSE',
    action => (id: string, term: string) =>
        action({
            id,
            term
        })
)
