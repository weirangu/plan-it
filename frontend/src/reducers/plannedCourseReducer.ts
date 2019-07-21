import { RootAction } from 'actions'
import {
    deletePlannedCourseAction,
    movePlannedCourseAction,
    updatePlannedCourseAction
} from 'actions/plannedCourseActions'
import { deleteTermAction } from 'actions/termActions'
import { deleteFromDictionary, updateDictionary } from 'reducers/helpers'
import { PlannedCourse } from 'reducers/types'
import { createReducer, Reducer } from 'typesafe-actions'

/** The state for the PlannedCourse reducer. */
export interface PlannedCourseReducerState {
    readonly [id: string]: PlannedCourse
}

export const plannedCourseReducer: Reducer<
    PlannedCourseReducerState,
    RootAction
> = createReducer({} as PlannedCourseReducerState)
    .handleAction(updatePlannedCourseAction, (state, action) =>
        updateDictionary(state, action.payload.id, action.payload)
    )
    .handleAction(movePlannedCourseAction, (state, action) => {
        if (action.payload.destTerm !== undefined) {
            const movedCourse = { ...state[action.payload.id] }
            movedCourse.term = action.payload.destTerm
            return updateDictionary(state, action.payload.id, movedCourse)
        }
        // If we're here, then the term of the course never changed, so the
        // course doesn't need to change.
        return state
    })
    .handleAction(deletePlannedCourseAction, (state, action) =>
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

export default plannedCourseReducer
