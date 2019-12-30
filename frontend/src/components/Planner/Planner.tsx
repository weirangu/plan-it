import AddDeleteButton from 'components/Planner/AddDeleteButton'
import PlannerList from 'components/Planner/PlannerList'
import PlannerHeader from 'components/Planner/PlannerHeader'
import React, { useCallback, useMemo } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { movePlannerCourse } from 'store/effects/plannerCourse'
import { deleteTerm, newTerm } from 'store/effects/term'
import { TermReducerState } from 'store/reducers/termReducer'
import { ID, Plan, RootState, Term, TermMonth } from 'store/reducers/types'
import { selectTerm } from 'store/selectors'
import styles from './Planner.module.css'

export interface PlannerProps {
    plan: Plan // The plan that we're showing
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
    month: TermMonth
    year: number
}): { month: TermMonth; year: number } {
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
    month: TermMonth
    year: number
}): { month: TermMonth; year: number } {
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
    const { plan }: { plan: Plan } = props
    const terms: TermReducerState = useSelector(selectTerm)
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch()

    const sortedTerms: (Term & ID)[] = useMemo(
        () =>
            Object.entries(terms)
                .filter(([key]: [string, Term]) => plan.terms.includes(key))
                .map(([key, term]: [string, Term]) => ({ ...term, id: key }))
                .sort(
                    (term1: Term, term2: Term) =>
                        term2.year * 10 +
                        term2.month -
                        term1.year * 10 -
                        term1.month
                ),
        [terms, plan]
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
                    plan: plan.id as string
                })
            ),
        [sortedTerms, plan, dispatch]
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
                    plan: plan.id as string
                })
            ),
        [sortedTerms, plan, dispatch]
    )

    /** This function is used to delete the oldest term in the plan. */
    const deleteOldTerm = useCallback(
        () => dispatch(deleteTerm(sortedTerms[sortedTerms.length - 1].id)),
        [sortedTerms, dispatch]
    )

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <PlannerHeader planID={plan.id} />
            <div className={styles.planner}>
                <AddDeleteButton
                    onAdd={addNewTerm}
                    onDelete={
                        sortedTerms.length > 1 ? deleteNewTerm : undefined
                    }
                />
                {sortedTerms.map((term: Term & ID) => (
                    <PlannerList key={term.id} term={term} />
                ))}
                <AddDeleteButton
                    onAdd={addOldTerm}
                    onDelete={
                        sortedTerms.length > 1 ? deleteOldTerm : undefined
                    }
                />
            </div>
        </DragDropContext>
    )
}

export default Planner
