import { TermReducerState } from './termReducer'
import { PlannerCourseReducerState } from './plannerCourseReducer'
import { CourseReducerState } from './courseReducer'
import { PlanReducerState } from './planReducer'

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
export interface PlannerCourse {
    readonly course: string
    readonly term: string
    // We don't have index here, we'll use term's courses array to keep track of
    // the order of courses.
}

export type Month = 1 | 5 | 7 | 9

/**
 * A dictionary of terms.
 * Each term consists of courses that are taken during that term.
 */
export interface Term {
    readonly year: number
    readonly month: Month
    readonly courses: string[]
    readonly plan: string
}

/**
 * A plan consists of multiple terms.
 */
export interface Plan {
    // If id is undefined, it means we haven't connected to the backend yet
    readonly id: string
    readonly name: string
    readonly terms: string[] // The term IDs are stored here
}

/** A course's information. */
export interface Course {
    readonly code: string
    readonly name: string
    readonly description: string
    readonly prerequisites: string
    readonly exclusions: string
    readonly faculty: string
    readonly campus: string
    readonly breadth: string[]
}

/**
 * The main state for the rootReducer.
 */
export interface RootState {
    readonly plans: PlanReducerState
    readonly terms: TermReducerState
    readonly plannerCourses: PlannerCourseReducerState
    readonly courses: CourseReducerState
}
