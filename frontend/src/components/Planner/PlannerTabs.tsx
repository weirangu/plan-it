import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { newPlan } from 'effects/plan'
import { newTerm } from 'effects/term'
import { APIResponsePlan } from 'api/types/responseTypes'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from 'reducers/types'
import { RootAction } from 'actions'

export interface PlannerTabsProps {
    setIndex: (index: number) => any
    tabs: string[]
}

export const PlannerTabs: React.FC<PlannerTabsProps> = (
    props: PlannerTabsProps
) => {
    const dispatch: ThunkDispatch<RootState, void, RootAction> = useDispatch()
    const newPlanCallback = useCallback(
        () => dispatch(newPlan({ name: 'My Plan' }, 2019, 9)),
        [dispatch]
    )

    return (
        <div>
            {props.tabs.map((tab: string, index: number) => (
                <button key={index} onClick={() => props.setIndex(index)}>
                    {tab}
                </button>
            ))}
            <button onClick={newPlanCallback}>New Plan</button>
        </div>
    )
}
