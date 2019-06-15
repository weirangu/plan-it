// This file contains the different types used in the redux state

/** A course in the planner. */
export interface Course {
    code: string
}

/**
 * A dictionary of terms.
 * Each term consists of courses that are taken during that term.
 */
export interface Term {
    name: string
    courses: Course[]
}

/**
 * A plan consists of multiple terms.
 */
export interface PlanData {
    name: string
    terms: { [id: string]: Term } // The id is the ID of the term in the backend
}

/**
 * This is the main state for the rootReducer. It is PlanData with the ID
 * obtained from the backend.
 */
export interface Plan extends PlanData {
    // The id of this plan as stored on the backend, if undefined it means that
    // we're waiting on the server for an id
    id?: string
}
