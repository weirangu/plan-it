import { getPlan } from 'store/effects/plan'
import rootReducer from 'store/reducers'
import { RootState } from 'store/reducers/types'
import { AnyAction, applyMiddleware, createStore } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { loadPlans, savePlans } from 'store/saveStore'

// The main Redux store for this application
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<RootState, AnyAction>)
)

// Load plans from localstorage
const plans: string[] | null = loadPlans()
if (plans) {
    plans.forEach((plan: string) => {
        store.dispatch(getPlan(plan))
    })
}

// Save plans every time a action is triggered
store.subscribe(savePlans)

export default store
