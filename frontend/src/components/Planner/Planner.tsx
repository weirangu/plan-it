import PlannerList from 'components/Planner/PlannerList'
import { movePlannerCourse } from 'effects/plannerCourse'
import { deleteTerm, newTerm } from 'effects/term'
import React, { useCallback, useMemo } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlan, selectPlannerCourse, selectTerm } from 'selectors'
import { PlanReducerState } from 'reducers/planReducer'
import { TermReducerState } from 'reducers/termReducer'
import { ThunkDispatch } from 'redux-thunk'
import { PlannerCourseReducerState } from 'reducers/plannerCourseReducer'
import { ID, Month, RootState, Term } from 'reducers/types'
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
    month: Month
    year: number
}): { month: Month; year: number } {
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
    month: Month
    year: number
}): { month: Month; year: number } {
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

/**
 * Maps a month to the name of a term.
 * @param month The month to get the name of the term of.
 */
function mapMonthToTerm(month: Month): string {
    switch (month) {
        case 1:
            return 'Winter'
        case 5:
            return 'Summer F'
        case 7:
            return 'Summer S'
        case 9:
            return 'Fall'
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

    const sortedTerms: (Term & ID)[] = useMemo(
        () =>
            Object.entries(terms)
                .filter(([key]: [string, Term]) =>
                    plans[props.planIndex].terms.includes(key)
                )
                .map(([key, term]: [string, Term]) => ({ ...term, id: key }))
                .sort(
                    (term1: Term, term2: Term) =>
                        term2.year * 10 +
                        term2.month -
                        term1.year * 10 -
                        term1.month
                ),
        [plans, terms, props.planIndex]
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

    /** This function is used to add the term after the newest term in the plan. */
    const addNewTerm = useCallback(
        () =>
            dispatch(
                newTerm({
                    ...getNextTerm(sortedTerms[0]),
                    plan: plans[props.planIndex].id as string
                })
            ),
        [sortedTerms, plans, dispatch, props.planIndex]
    )

    /** This function is used to delete the newest term in the plan. */
    const deleteNewTerm = useCallback(
        () => dispatch(deleteTerm(sortedTerms[0].id)),
        [sortedTerms, dispatch]
    )

    /** This function is used to add the term before the oldest term in the plan. */
    const addOldTerm = useCallback(
        () =>
            dispatch(
                newTerm({
                    ...getPrevTerm(sortedTerms[sortedTerms.length - 1]),
                    plan: plans[props.planIndex].id as string
                })
            ),
        [sortedTerms, plans, dispatch, props.planIndex]
    )

    /** This function is used to delete the oldest term in the plan. */
    const deleteOldTerm = useCallback(
        () => dispatch(deleteTerm(sortedTerms[sortedTerms.length - 1].id)),
        [sortedTerms, dispatch]
    )

    let deleteNewTermButton: JSX.Element | undefined
    let deleteOldTermButton: JSX.Element | undefined
    if (sortedTerms.length > 1) {
        deleteNewTermButton = <button onClick={deleteNewTerm}>Delete</button>
        deleteOldTermButton = <button onClick={deleteOldTerm}>Delete</button>
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <button onClick={addNewTerm}>Add</button>
            {deleteNewTermButton}
            {sortedTerms.map((term: Term & ID) => {
                const courseArray = term.courses.map((id: string) => ({
                    id,
                    ...plannerCourses[id]
                }))
                return (
                    <div key={term.id}>
                        <h3>
                            Term: {term.year.toString()}{' '}
                            {mapMonthToTerm(term.month)}
                        </h3>
                        <PlannerList
                            items={courseArray}
                            id={term.id}
                            key={term.id}
                        />
                    </div>
                )
            })}
            <button onClick={addOldTerm}>Add</button>
            {deleteOldTermButton}
        </DragDropContext>
    )
}

export default Planner
