import plannerCourseReducer from 'reducers/plannerCourseReducer'
import planReducer from 'reducers/planReducer'
import termReducer from 'reducers/termReducer'
import { combineReducers, Reducer } from 'redux'
import { RootState } from 'reducers/types'
import courseReducer from 'reducers/courseReducer'

/**
 * The root reducer.
 */
export const rootReducer: Reducer<RootState> = combineReducers({
    plans: planReducer,
    terms: termReducer,
    plannerCourses: plannerCourseReducer,
    courses: courseReducer
})

export default rootReducer
