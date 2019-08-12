/**
 * This file contains all the types that the API uses in a request body.
 */

import { Month } from 'reducers/types'

/** The type for a Plan that the backend receives. */
export interface APIRequestPlan {
    name: string
}

/** The type for a Term that the backend receives. */
export interface APIRequestTerm {
    year: number
    month: Month
    plan: string
}

/**
 * The type for a PlannerCourse that the backend receives.
 * Not used for moving courses.
 */
export interface APIRequestPlannerCourse {
    course: string
    term: string
    index: number // The index of this course in the term
}

/** The type for moving a PlannerCourse that the backend receives. */
export interface APIRequestMovePlannerCourse {
    index: number
    term?: string
}
