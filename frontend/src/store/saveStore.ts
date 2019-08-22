/**
 * This file contains functions that deal with storing the information in the
 * Redux store in localstorage.
 */
import { Plan } from 'store/reducers/types'
import store from 'store/index'

/** Saves all current plans to localstorage. */
export function savePlans(): void {
    const plans = store.getState().plans.map((plan: Plan) => plan.id)
    localStorage.setItem('plans', JSON.stringify(plans))
}

/**
 * Gets the Plan from localstorage, or gets a new one from the backend
 * if one doesn't exist. This is done on page load.
 * @returns A list of Plan IDs loaded from localstorage, or null if there isn't
 * any plans in localstorage.
 */
export function loadPlans(): string[] | null {
    const local: string | null = localStorage.getItem('plans')

    if (local === null) {
        return null
    } else {
        return JSON.parse(local)
    }
}
