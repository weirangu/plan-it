import { newPlan, getPlan } from 'effects/plan'
import rootReducer from 'reducers'
import { State } from 'reducers/types'
import { AnyAction, applyMiddleware, createStore } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'

// The main Redux store for this application
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<State, AnyAction>)
)

// The following functions handle saving the store whenever it is updated
function saveState(id: string) {
    localStorage.setItem('planID', id)
}

store.subscribe(() => {
    const id = store.getState().plan.id
    if (id !== undefined) {
        saveState(id)
    }
})

/**
 * Gets the Plan from localStorage, or gets a new one from the backend
 * if one doesn't exist. This is done on page load.
 */
function getInitialPlan(): void {
    let id: string | null = localStorage.getItem('planID')

    if (id !== null) {
        // We get an existing plan from the server
        store.dispatch(getPlan(id))
    } else {
        // We make a new plan
        store.dispatch(newPlan(store.getState().plan))
    }
}

getInitialPlan()

export default store
