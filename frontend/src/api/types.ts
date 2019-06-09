/**
 * This file contains all the types that the API uses in POST requests.
 */

/** The type for a Plan used by the backend. */
export interface APIPlan {
    id?: number
    name: string
    terms: APITerm[]
}

/** The type for a Term used by the backend. */
export interface APITerm {
    name: string
    courses: APIPlannedCourse[]
}

/** The type for a PlannedCourse used by the backend. */
export interface APIPlannedCourse {
    course: string
}
