import { RootAction } from 'actions'
import {
    deletePlannerCourseAction,
    movePlannerCourseAction,
    updatePlannerCourseAction
} from 'actions/plannerCourseActions'
import { deleteTermAction } from 'actions/termActions'
import { deleteFromDictionary, updateDictionary } from 'reducers/helpers'
import { PlannerCourse } from 'reducers/types'
import { createReducer } from 'typesafe-actions'

/** The state for the PlannerCourse reducer. */
export interface PlannerCourseReducerState {
    readonly [id: string]: PlannerCourse
}

export const PlannerCourseReducer = createReducer<
    PlannerCourseReducerState,
    RootAction
>({} as PlannerCourseReducerState)
    .handleAction(updatePlannerCourseAction, (state, action) =>
        updateDictionary(state, action.payload.id, action.payload)
    )
    .handleAction(movePlannerCourseAction, (state, action) => {
        if (action.payload.destTerm !== undefined) {
            const movedCourse = { ...state[action.payload.id] }
            movedCourse.term = action.payload.destTerm
            return updateDictionary(state, action.payload.id, movedCourse)
        }
        // If we're here, then the term of the course never changed, so the
        // course doesn't need to change.
        return state
    })
    .handleAction(deletePlannerCourseAction, (state, action) =>
        deleteFromDictionary(state, action.payload.id)
    )
    .handleAction(deleteTermAction, (state, action) => {
        const stateCopy = { ...state }
        for (const id in state) {
            if (state[id].term === action.payload.id) {
                delete stateCopy[id]
            }
        }
        return stateCopy
    })

export default PlannerCourseReducer
