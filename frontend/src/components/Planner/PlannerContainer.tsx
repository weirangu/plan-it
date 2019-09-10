import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { getPlan } from 'store/effects/plan'
import { Plan } from 'store/reducers/types'
import { selectPlan } from 'store/selectors'
import Planner from './Planner'
import { PlannerTabs } from './PlannerTabs'

export const PlannerContainer = (
    props: RouteComponentProps<{ plan: string }>
) => {
    const plans: Plan[] = useSelector(selectPlan)
    const dispatch = useDispatch()
    const activePlan = props.match.params.plan
    const plan: Plan | undefined = plans.find(
        (value: Plan) => value.id === activePlan
    )

    const setActivePlan = (id: string): void => {
        props.history.push(`/${id}`)
    }

    if (plan === undefined) {
        dispatch(getPlan(activePlan))
    }

    return (
        <div>
            <PlannerTabs activePlan={activePlan} setPlan={setActivePlan} />
            {plan !== undefined && <Planner plan={plan} />}
        </div>
    )
}

export default PlannerContainer
