import { combineReducers } from 'redux'
import courseReducer from 'reducers/courseReducer'
import planReducer from 'reducers/planReducer'
import termReducer from 'reducers/termReducer'

export const rootReducer = combineReducers({
    plan: planReducer,
    terms: termReducer,
    courses: courseReducer
})

export default rootReducer
