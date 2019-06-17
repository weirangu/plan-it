import axios, { AxiosPromise } from 'axios'
import { PlanData, Plan } from 'reducers/types'

export function newPlan (plan: PlanData): AxiosPromise<Plan> {
    // PlanData isn't what the API takes in, so we need to convert it into
    // APIPlan
    const request = { name: plan.name, terms: Object.values(plan.terms) }
    return axios.post<Plan>(`http://localhost:8000/plan/`, request)
}

// export function savePlan(plan: PlanData): AxiosPromise<Plan> {

// }

export function getPlan (id: string): AxiosPromise<Plan> {
    return axios.get<Plan>(`http://localhost:8000/plan/${id}`)
}
