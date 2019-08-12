import { createAction } from 'typesafe-actions'
import store from 'store'
import { Month } from 'reducers/types'

/** Deletes a term in the plan. */
export const deleteTermAction = createAction(
    'DELETE_TERM',
    action => (id: string) =>
        action({ id, plan: store.getState().terms[id].plan })
)

/** Updates or adds a term in the plan. */
export const updateTermAction = createAction(
    'UPDATE_TERM',
    action => (
        id: string,
        year: number,
        month: Month,
        courses: string[],
        plan: string
    ) => action({ id, year, month, courses, plan })
)
