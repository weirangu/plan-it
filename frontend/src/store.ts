import { getPlan, newPlan } from 'effects/plan'
import rootReducer from 'reducers'
import { Plan, RootState } from 'reducers/types'
import { AnyAction, applyMiddleware, createStore } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'

// The main Redux store for this application
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<RootState, AnyAction>)
)

// The following functions handle saving the store whenever it is updated
function saveState(ids: string[]) {
    localStorage.setItem('plans', JSON.stringify(ids))
}

store.subscribe(() => {
    const plans = store.getState().plans.map((plan: Plan) => plan.id)
    saveState(plans)
})

/**
 * Gets the Plan from localStorage, or gets a new one from the backend
 * if one doesn't exist. This is done on page load.
 */
function getInitialPlan(): void {
    const local: string | null = localStorage.getItem('plans')

    if (local !== null) {
        // We get an existing plan from the server
        const plans: string[] = JSON.parse(local)
        plans.forEach((plan: string) => {
            store.dispatch(getPlan(plan))
        })
    } else {
        // We make a new plan
        store.dispatch(
            newPlan({
                name: 'My Plan'
            })
        )
    }
}

getInitialPlan()

export default store
