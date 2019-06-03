// This file contains the different types used in the redux state

/** A course in the planner. */
export interface Course {
    code: string
}

/**
 * A dictionary of terms.
 * Each term consists of courses that are taken during that term.
 */
export type Terms = { [id: string]: Course[] }

/**
 * A plan consists of multiple terms.
 * This is the main state for the rootReducer.
 */
export interface Plan {
    name: string
    terms: Terms
}