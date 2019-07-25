import React from 'react'
import { useDispatch } from 'react-redux'
import { newPlan } from 'effects/plan'

export interface PlannerTabsProps {
    setIndex: (index: number) => any
    tabs: string[]
}

export const PlannerTabs: React.FC<PlannerTabsProps> = (
    props: PlannerTabsProps
) => {
    const dispatch = useDispatch()

    return (
        <div>
            {props.tabs.map((tab: string, index: number) => (
                <button onClick={() => props.setIndex(index)}>{tab}</button>
            ))}
            <button onClick={() => dispatch(newPlan({ name: 'My Plan' }))}>
                New Plan
            </button>
        </div>
    )
}
