import { createStore } from 'redux'
import rootReducer from 'reducers/rootReducer'

// The main Redux store for this application
const store = createStore(rootReducer)

// The following functions handle saving the store whenever it is updated
function saveState (id: string) {
    localStorage.setItem('planID', id)
}

store.subscribe(() => {
    const id = store.getState().plan.id
    if (id !== undefined) {
        // TODO
    }
})

export default store
