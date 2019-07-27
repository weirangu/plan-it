/**
 * A collection of functions used in the useSelector hook provided by React Redux.
 */
import { RootState } from 'reducers/types'
import { PlanReducerState } from 'reducers/planReducer'
import { TermReducerState } from 'reducers/termReducer'
import { PlannerCourseReducerState } from 'reducers/plannerCourseReducer'
import { CourseReducerState } from 'reducers/courseReducer'

/**
 * Selects the PlanReducerState from the global Redux state.
 * @param state The global Redux state.
 * @returns The part of the state that represents the plans.
 */
export function selectPlan(state: RootState): PlanReducerState {
    return state.plans
}

/**
 * Selects the TermReducerState from the global Redux state.
 * @param state The global Redux state.
 * @returns The part of the state that represents the terms.
 */
export function selectTerm(state: RootState): TermReducerState {
    return state.terms
}

/**
 * Selects the PlannerCourseReducerState from the global Redux state.
 * @param state The global Redux state.
 * @returns The part of the state that represents the planned courses.
 */
export function selectPlannerCourse(
    state: RootState
): PlannerCourseReducerState {
    return state.plannerCourses
}

/**
 * Selects the CourseReducerState from the global Redux state.
 * @param state The global Redux state.
 * @returns The part of the state that represents the courses.
 */
export function selectCourse(state: RootState): CourseReducerState {
    return state.courses
}
