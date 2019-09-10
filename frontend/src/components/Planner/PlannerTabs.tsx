import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootAction } from 'store/actions'
import { newPlan } from 'store/effects/plan'
import { Plan, RootState } from 'store/reducers/types'
import { selectPlan } from 'store/selectors'
import styles from './PlannerTabs.module.css'

export interface PlannerTabsProps {
    activePlan: string | null
    setPlan: (plan: string) => any
}

export const PlannerTabs: React.FC<PlannerTabsProps> = (
    props: PlannerTabsProps
) => {
    const plans: Plan[] = useSelector(selectPlan)
    const dispatch: ThunkDispatch<RootState, void, RootAction> = useDispatch()
    const newPlanCallback = useCallback(
        () => dispatch(newPlan({ name: 'My Plan' }, 2019, 9)),
        [dispatch]
    )

    return (
        <div className={styles.tabs}>
            {plans.map(({ id, name }: Plan) => {
                let buttonClass = styles.buttons
                if (id === props.activePlan) {
                    buttonClass += ` ${styles.selectedButton}`
                }
                return (
                    <button
                        className={buttonClass}
                        key={id}
                        onClick={() => props.setPlan(id)}
                    >
                        {name}
                    </button>
                )
            })}
            <button className={styles.buttons} onClick={newPlanCallback}>
                New Plan
            </button>
        </div>
    )
}
