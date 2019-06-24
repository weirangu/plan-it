/**
 * This file contains all the types that the API uses in a request.
 */

/** The type for a Plan that the backend receives. */
export interface APIRequestPlan {
    name: string
}

/** The type for a Term that the backend receives. */
export interface APIRequestTerm {
    name: string
    plan: string
}

/**
 * The type for a PlannedCourse that the backend receives.
 * Not used for moving courses.
 */
export interface APIRequestPlannedCourse {
    course: string
    term: string
    index: number // The index of this course in the term
}

/** The type for moving a PlannedCourse that the backend receives. */
export interface APIRequestMovePlannedCourse {
    index: number
    term?: string
}
