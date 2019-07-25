import {
    deletePlannedCourseAction,
    movePlannedCourseAction,
    updatePlannedCourseAction
} from 'actions/plannedCourseActions'
import { deleteTermAction, updateTermAction } from 'actions/termActions'
import { deleteFromDictionary, updateDictionary } from 'reducers/helpers'
import { Term } from 'reducers/types'
import { createReducer } from 'typesafe-actions'
import { RootAction } from 'actions'

export interface TermReducerState {
    readonly [id: string]: Term
}

export const termReducer = createReducer<TermReducerState, RootAction>(
    {} as TermReducerState
)
    .handleAction(updateTermAction, (state, action) =>
        updateDictionary(state, action.payload.id, action.payload)
    )
    .handleAction(deleteTermAction, (state, action) =>
        deleteFromDictionary(state, action.payload.id)
    )
    .handleAction(updatePlannedCourseAction, (state, action) => {
        const courseID = state[action.payload.term].courses.find(
            (course: string) => action.payload.id === course
        )
        if (courseID !== undefined) {
            return state
        }
        const term = { ...state[action.payload.term] }
        const stateCopy = { ...state }

        term.courses[action.payload.index] = action.payload.id
        stateCopy[action.payload.id] = term
        return stateCopy
    })
    .handleAction(deletePlannedCourseAction, (state, action) => {
        const term = { ...state[action.payload.term] }
        const index = term.courses.findIndex(
            (val: string) => val === action.payload.id
        )
        term.courses.splice(index, 1)
        return {
            ...state,
            [action.payload.id]: term
        }
    })
    .handleAction(movePlannedCourseAction, (state, action) => {
        const updatedState = { ...state }
        const sourceTerm = updatedState[action.payload.sourceTerm]
        const sourceIndex = sourceTerm.courses.findIndex(
            (val: string) => val === action.payload.id
        )
        const [removedCourse] = sourceTerm.courses.splice(sourceIndex, 1)
        if (action.payload.destTerm === undefined) {
            // We're not changing terms
            updatedState[action.payload.sourceTerm].courses.splice(
                action.payload.index,
                0,
                removedCourse
            )
        } else {
            // We are changing terms
            updatedState[action.payload.destTerm].courses.splice(
                action.payload.index,
                0,
                removedCourse
            )
        }
        return updatedState
    })

export default termReducer
