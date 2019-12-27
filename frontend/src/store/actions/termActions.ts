import { TermMonth } from 'store/reducers/types'
import { createAction } from 'typesafe-actions'

/**
 * Deletes a term in the plan.
 * @param id The ID of the term to delete.
 * @param plan The Plan that this term belongs to.
 */
export const deleteTermAction = createAction(
    'DELETE_TERM',
    (id: string, plan: string) => ({ id, plan })
)()

/**
 * Updates or adds a term in the plan.
 * @param id The ID of the term to update/add.
 * @param year The year that the term represents (e.g. 2019)
 * @param month The month that the term represents (e.g. 9)
 * @param courses The list of PlannedCourse IDs that belong to the term.
 * @param plan The Plan that this term belongs to.
 */
export const updateTermAction = createAction(
    'UPDATE_TERM',
    (
        id: string,
        year: number,
        month: TermMonth,
        courses: string[],
        plan: string
    ) => ({ id, year, month, courses, plan })
)()
