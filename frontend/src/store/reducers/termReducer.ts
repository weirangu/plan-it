import { RootAction } from 'store/actions'
import {
    deletePlannerCourseAction,
    movePlannerCourseAction,
    updatePlannerCourseAction
} from 'store/actions/plannerCourseActions'
import { deleteTermAction, updateTermAction } from 'store/actions/termActions'
import { deleteFromDictionary } from 'store/reducers/helpers'
import { Term } from 'store/reducers/types'
import { createReducer } from 'typesafe-actions'

export interface TermReducerState {
    readonly [id: string]: Term
}

export const termReducer = createReducer<TermReducerState, RootAction>(
    {} as TermReducerState
)
    .handleAction(updateTermAction, (state, { payload }) => ({
        ...state,
        [payload.id]: payload
    }))
    .handleAction(deleteTermAction, (state, { payload }) =>
        deleteFromDictionary(state, payload.id)
    )
    .handleAction(updatePlannerCourseAction, (state, { payload }) => {
        const courseID = state[payload.term].courses.find(
            (course: string) => payload.id === course
        )
        if (courseID !== undefined) {
            return state
        }
        const term = { ...state[payload.term] }
        const stateCopy = { ...state }

        term.courses[payload.index] = payload.id
        stateCopy[payload.id] = term
        return stateCopy
    })
    .handleAction(deletePlannerCourseAction, (state, { payload }) => {
        const term = { ...state[payload.term] }
        const index = term.courses.findIndex(
            (val: string) => val === payload.id
        )
        term.courses.splice(index, 1)
        return {
            ...state,
            [payload.id]: term
        }
    })
    .handleAction(movePlannerCourseAction, (state, { payload }) => {
        const updatedState = { ...state }
        const sourceTerm = updatedState[payload.sourceTerm]
        const sourceIndex = sourceTerm.courses.findIndex(
            (val: string) => val === payload.id
        )
        const [removedCourse] = sourceTerm.courses.splice(sourceIndex, 1)
        if (payload.destTerm === undefined) {
            // We're not changing terms
            updatedState[payload.sourceTerm].courses.splice(
                payload.index,
                0,
                removedCourse
            )
        } else {
            // We are changing terms
            updatedState[payload.destTerm].courses.splice(
                payload.index,
                0,
                removedCourse
            )
        }
        return updatedState
    })

export default termReducer
