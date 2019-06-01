import { createStore } from 'redux'
import rootReducer from 'reducers/rootReducer'

// The main Redux store for this application
const store = createStore(rootReducer)

export default store
