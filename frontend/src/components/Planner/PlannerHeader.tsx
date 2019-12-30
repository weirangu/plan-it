import React, { ChangeEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { updatePlan } from 'store/effects/plan'
import { PlanReducerState } from 'store/reducers/planReducer'
import { Plan, RootState } from 'store/reducers/types'
import { selectPlan } from 'store/selectors'
import styles from './PlannerHeader.module.css'

interface PlannerHeaderProps {
    planID: string
}

const PlannerHeader: React.FC<PlannerHeaderProps> = (
    props: PlannerHeaderProps
) => {
    const [planID, setPlanID] = useState(props.planID)
    const plans: PlanReducerState = useSelector(selectPlan)
    const plan: Plan = useMemo(() => plans.find(val => val.id === planID), [
        plans,
        planID
    ]) as Plan
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch()

    const [editingName, setEditingName] = useState(plan.name)
    const [editing, setEditing] = useState(false)

    function onNameChange(event: ChangeEvent<HTMLInputElement>): void {
        setEditingName(event.target.value)
    }

    function toggleEditing(): void {
        if (editing) {
            dispatch(updatePlan({ ...plan, name: editingName }))
        } else {
            // Update editing name if the plan name has changed
            setEditingName(plan.name)
        }
        setEditing(!editing)
    }

    if (planID !== props.planID) {
        setPlanID(props.planID)
        if (editing) toggleEditing()
        return null // Get react to rerender this component
    }

    return (
        <div>
            <input
                disabled={!editing}
                value={editing ? editingName : plan.name}
                onChange={onNameChange}
                className={styles.header}
            />
            <button onClick={toggleEditing}>{editing ? 'Done' : 'Edit'}</button>
        </div>
    )
}

export default PlannerHeader
