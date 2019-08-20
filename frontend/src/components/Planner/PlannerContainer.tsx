import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Plan } from 'reducers/types'
import Planner from './Planner'
import { PlannerTabs } from './PlannerTabs'
import { selectPlan } from 'selectors'

export const PlannerContainer: React.FC = () => {
    const plans: Plan[] = useSelector(selectPlan)
    const [activeIndex, setActiveIndex] = useState<number>(0)

    let planner: JSX.Element | undefined
    if (plans.length !== 0) {
        planner = <Planner planIndex={activeIndex} />
    }
    return (
        <div>
            <PlannerTabs
                activeIndex={activeIndex}
                setIndex={setActiveIndex}
                tabs={plans.map((plan: Plan) => plan.name)}
            />
            {planner}
        </div>
    )
}

export default PlannerContainer
