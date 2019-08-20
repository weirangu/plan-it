import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newPlan } from 'effects/plan'
import { ThunkDispatch } from 'redux-thunk'
import { Plan, RootState } from 'reducers/types'
import { RootAction } from 'actions'
import styles from './PlannerTabs.module.css'
import { selectPlan } from 'selectors'

export interface PlannerTabsProps {
    activeIndex: number
    setIndex: (index: number) => any
    tabs: string[]
}

export const PlannerTabs: React.FC<PlannerTabsProps> = (
    props: PlannerTabsProps
) => {
    const plan: Plan[] = useSelector(selectPlan)
    const dispatch: ThunkDispatch<RootState, void, RootAction> = useDispatch()
    const newPlanCallback = useCallback(
        () =>
            dispatch(newPlan({ name: 'My Plan' }, 2019, 9)).then(() =>
                props.setIndex(plan.length)
            ),
        [dispatch, plan.length, props]
    )

    return (
        <div className={styles.tabs}>
            {props.tabs.map((tab: string, index: number) => {
                let buttonClass = styles.buttons
                if (index === props.activeIndex) {
                    buttonClass += ` ${styles.selectedButton}`
                }
                return (
                    <button
                        className={buttonClass}
                        key={index}
                        onClick={() => props.setIndex(index)}
                    >
                        {tab}
                    </button>
                )
            })}
            <button className={styles.buttons} onClick={newPlanCallback}>
                New Plan
            </button>
        </div>
    )
}
