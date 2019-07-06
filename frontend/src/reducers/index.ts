import courseReducer from 'reducers/courseReducer'
import planReducer from 'reducers/planReducer'
import termReducer from 'reducers/termReducer'
import { combineReducers, Reducer } from 'redux'
import { State } from './types'

/**
 * The root reducer.
 */
export const rootReducer: Reducer<State, any> = combineReducers({
    plan: planReducer,
    terms: termReducer,
    courses: courseReducer
})

export default rootReducer
