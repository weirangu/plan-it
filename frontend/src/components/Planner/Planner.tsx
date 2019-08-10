import PlannerList from 'components/Planner/PlannerList'
import { movePlannerCourse } from 'effects/plannerCourse'
import { newTerm } from 'effects/term'
import React, { useCallback, useMemo } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import './planner.css'
import { selectPlan, selectPlannerCourse, selectTerm } from 'selectors'
import { PlanReducerState } from 'reducers/planReducer'
import { TermReducerState } from 'reducers/termReducer'
import { ThunkDispatch } from 'redux-thunk'
import { PlannerCourseReducerState } from 'reducers/plannerCourseReducer'
import { RootState, Term } from 'reducers/types'
import { RootAction } from 'actions'

export interface PlannerProps {
    planIndex: number
}

/**
 * Gets the next term of the given term.
 * @param month The month of the term to find the next term for.
 * @param year The year of the term to find the next term for.
 */
function getNextTerm({
    month,
    year
}: {
    month: number
    year: number
}): { month: number; year: number } {
    switch (month) {
        case 1:
            return { month: 5, year }
        case 5:
            return { month: 7, year }
        case 7:
            return { month: 9, year }
        case 9:
            return { month: 1, year: year + 1 }
        default:
            throw new Error('Month is not one of 1, 5, 7, 9!')
    }
}

/**
 * Gets the previous term given a term.
 * @param month The month of the term to find the previous term for.
 * @param year The year of the term to find the previous term for.
 */
function getPrevTerm({
    month,
    year
}: {
    month: number
    year: number
}): { month: number; year: number } {
    switch (month) {
        case 1:
            return { month: 9, year: year - 1 }
        case 5:
            return { month: 1, year }
        case 7:
            return { month: 5, year }
        case 9:
            return { month: 7, year }
        default:
            throw new Error('Month is not one of 1, 5, 7, 9!')
    }
}

const Planner: React.FC<PlannerProps> = (props: PlannerProps) => {
    const plans: PlanReducerState = useSelector(selectPlan)
    const terms: TermReducerState = useSelector(selectTerm)
    const plannerCourses: PlannerCourseReducerState = useSelector(
        selectPlannerCourse
    )
    const dispatch: ThunkDispatch<RootState, void, RootAction> = useDispatch()

    const sortedTerms = useMemo(
        () =>
            Object.values(terms).sort(
                (term1, term2) =>
                    term1.year * 10 +
                    term1.month -
                    term2.year * 10 -
                    term2.month
            ),
        [terms]
    )

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

    const addNewTerm = useCallback(
        () =>
            dispatch(
                newTerm({
                    ...getNextTerm(sortedTerms[sortedTerms.length - 1]),
                    plan: plans[props.planIndex].id as string
                })
            ),
        [sortedTerms, plans, dispatch, props.planIndex]
    )

    const addOldTerm = useCallback(
        () =>
            dispatch(
                newTerm({
                    ...getPrevTerm(sortedTerms[0]),
                    plan: plans[props.planIndex].id as string
                })
            ),
        [sortedTerms, plans, dispatch, props.planIndex]
    )

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <button onClick={addNewTerm}>Add Term</button>
            {plans[props.planIndex].terms.map((id: string) => {
                console.log(plans[props.planIndex].terms)
                console.log(terms)
                const courseArray = terms[id].courses.map((id: string) => ({
                    id,
                    ...plannerCourses[id]
                }))
                return (
                    <div key={id}>
                        <h3>
                            Term: {terms[id].year.toString() + terms[id].month}
                        </h3>
                        <PlannerList items={courseArray} id={id} key={id} />
                    </div>
                )
            })}
            <button onClick={addOldTerm}>Add Term</button>
        </DragDropContext>
    )
}

export default Planner
