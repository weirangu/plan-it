import plannedCourseReducer from 'reducers/plannedCourseReducer'
import planReducer from 'reducers/planReducer'
import termReducer from 'reducers/termReducer'
import { combineReducers, Reducer } from 'redux'
import { State } from 'reducers/types'
import courseReducer from 'reducers/courseReducer'

/**
 * The root reducer.
 */
export const rootReducer: Reducer<State, any> = combineReducers({
    plan: planReducer,
    terms: termReducer,
    plannedCourses: plannedCourseReducer,
    courses: courseReducer
})

export default rootReducer
