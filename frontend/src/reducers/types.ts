import { TermReducerState } from './termReducer'
import { CourseReducerState } from './courseReducer'

// This file contains the different types used in the redux state

/**
 * An interface with the property id. Use this in conjunction to the other types
 * defined in this file to create a type with the ID field.
 *
 * For example, the type "ID & Plan" will have the fields of Plan and ID
 * together.
 */
export interface ID {
    id: string
}

/** A course in the planner. */
export interface PlannedCourse {
    course: string
    term: string
    // We don't have index here, we'll use term's courses array to keep track of
    // the order of courses.
}

/**
 * A dictionary of terms.
 * Each term consists of courses that are taken during that term.
 */
export interface Term {
    name: string
    courses: string[]
    plan: string
}

/**
 * A plan consists of multiple terms.
 */
export interface Plan {
    // If id is undefined, it means we haven't connected to the backend yet
    id?: string
    name: string
    terms: string[] // The term IDs are stored here
}

/**
 * The main state for the rootReducer.
 */
export interface State {
    plan: Plan
    terms: TermReducerState
    courses: CourseReducerState
}
