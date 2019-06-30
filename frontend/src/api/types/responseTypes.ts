/**
 * This file contains all the types that the API uses in a response.
 */

/** The type for a Plan returned by the backend. */
export interface APIResponsePlan {
    id: string
    name: string
    terms: APIResponseTerm[]
}

/** The type for a Term returned by the backend. */
export interface APIResponseTerm {
    id: string
    name: string
    courses: APIResponsePlannedCourse[]
    plan: string
}

/** The type for a PlannedCourse returned by the backend (for non-move requests). */
export interface APIResponsePlannedCourse {
    id: string
    course: string
    term: string
    index: number // The index of this course in the term
}

/** The type for a PlannedCourse move returned by the backend. */
export interface APIResponseMovePlannedCourse {
    updatedTerms: APIResponseTerm[]
}
