import { createAction } from 'typesafe-actions'

/** Deletes a term in the plan. */
export const deleteTermAction = createAction(
    'DELETE_TERM',
    action => (id: string) => action({ id })
)

/** Updates or adds a term in the plan. */
export const updateTermAction = createAction(
    'UPDATE_TERM',
    action => (id: string, name: string, courses: string[], plan: string) =>
        action({ id, name, courses, plan })
)
