import PlannerList from 'components/Planner/PlannerList'
import { movePlannerCourse } from 'effects/plannerCourse'
import { newTerm } from 'effects/term'
import React, { useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import './planner.css'
import { selectPlan, selectPlannerCourse, selectTerm } from 'selectors'
import { PlanReducerState } from 'reducers/planReducer'
import { TermReducerState } from 'reducers/termReducer'
import { ThunkDispatch } from 'redux-thunk'
import { PlannerCourseReducerState } from 'reducers/plannerCourseReducer'
import { RootState } from 'reducers/types'
import { RootAction } from 'actions'

export interface PlannerProps {
    planIndex: number
}

const Planner: React.FC<PlannerProps> = (props: PlannerProps) => {
    const plans: PlanReducerState = useSelector(selectPlan)
    const terms: TermReducerState = useSelector(selectTerm)
    const plannerCourses: PlannerCourseReducerState = useSelector(
        selectPlannerCourse
    )
    const dispatch: ThunkDispatch<RootState, void, RootAction> = useDispatch()

    const onDragEnd = useCallback(
        (result: DropResult) => {
            const source = result.source
            const dest = result.destination
            const courseID = terms[source.droppableId].courses[source.index]
            if (!dest) {
                return
            }
            if (source.droppableId === dest.droppableId) {
                dispatch(movePlannerCourse(courseID, dest.index))
            } else {
                dispatch(
                    movePlannerCourse(courseID, dest.index, dest.droppableId)
                )
            }
        },
        [terms, dispatch]
    )

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {plans[props.planIndex].terms.map((id: string) => {
                const courseArray = terms[id].courses.map((id: string) => ({
                    id,
                    ...plannerCourses[id]
                }))
                return (
                    <div key={id}>
                        <h3>Term: {terms[id].name}</h3>
                        <PlannerList items={courseArray} id={id} key={id} />
                    </div>
                )
            })}
            <button
                onClick={() =>
                    dispatch(
                        newTerm({
                            name: Math.random()
                                .toString(36)
                                .substring(0, 5),
                            plan: plans[props.planIndex].id as string
                        })
                    )
                }
            >
                Add Term
            </button>
        </DragDropContext>
    )
}

export default Planner
