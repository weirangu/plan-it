/**
 * This file contains all the types that the API returns in a response.
 */

import { TermMonth } from 'store/reducers/types'

/** The type for a Plan returned by the backend. */
export interface APIResponsePlan {
    id: string
    name: string
    terms: APIResponseTerm[]
}

/** The type for a Term returned by the backend. */
export interface APIResponseTerm {
    id: string
    year: number
    month: TermMonth
    courses: APIResponsePlannerCourse[]
    plan: string
}

/** The type for a PlannerCourse returned by the backend (for non-move requests). */
export interface APIResponsePlannerCourse {
    id: string
    course: string
    term: string
    index: number // The index of this course in the term
}

/** The type for a PlannerCourse move returned by the backend. */
export interface APIResponseMovePlannerCourse {
    updatedTerms: APIResponseTerm[]
}
