import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Plan, RootState } from 'reducers/types'
import Planner from './Planner'
import './planner.css'
import { PlannerTabs } from './PlannerTabs'

export const PlannerContainer: React.FC = () => {
    const plans: Plan[] = useSelector((state: RootState) => state.plans)
    const [activeIndex, setActiveIndex] = useState<number>(0)

    let planner: JSX.Element | undefined
    if (plans.length !== 0) {
        planner = <Planner planIndex={activeIndex} />
    }
    return (
        <div>
            <PlannerTabs
                setIndex={setActiveIndex}
                tabs={plans.map((plan: Plan) => plan.name)}
            />
            {planner}
        </div>
    )
}

export default PlannerContainer
