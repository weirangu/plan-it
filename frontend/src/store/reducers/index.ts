import { combineReducers, Reducer } from 'redux'
import courseReducer from 'store/reducers/courseReducer'
import plannerCourseReducer from 'store/reducers/plannerCourseReducer'
import planReducer from 'store/reducers/planReducer'
import termReducer from 'store/reducers/termReducer'
import { RootState } from 'store/reducers/types'

/** The root reducer. */
export const rootReducer: Reducer<RootState> = combineReducers({
    plans: planReducer,
    terms: termReducer,
    plannerCourses: plannerCourseReducer,
    courses: courseReducer
})

export default rootReducer
