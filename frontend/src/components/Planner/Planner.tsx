import PlannerList from 'components/Planner/PlannerList'
import { movePlannedCourse } from 'effects/plannedCourse'
import { deleteTerm, newTerm } from 'effects/term'
import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { PlannedCourseReducerState } from 'reducers/plannedCourseReducer'
import { TermReducerState } from 'reducers/termReducer'
import { Plan, State, Term } from 'reducers/types'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import store from 'store'
import './planner.css'

export interface PlannerProps {
    plan: Plan
    terms: TermReducerState
    plannedCourses: PlannedCourseReducerState
    addTerm: (term: Term) => any // Provided by mapDispatchToProps
    delTerm: (id: string) => any // Provided by mapDispatchToProps
}

function mapStateToProps(state: State): State {
    return state
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, AnyAction>) {
    return {
        addTerm: (term: Term) => dispatch(newTerm(term)),
        delTerm: (id: string) => dispatch(deleteTerm(id))
    }
}

function onDragEnd(result: DropResult, terms: TermReducerState): void {
    if (!result.destination) {
        return
    }
    const source = result.source
    const dest = result.destination
    const courseID = terms[source.droppableId].courses[source.index]

    if (source.droppableId === dest.droppableId) {
        store.dispatch(movePlannedCourse(courseID, dest.index))
    } else {
        store.dispatch(
            movePlannedCourse(courseID, dest.index, dest.droppableId)
        )
    }
}

const ConnectedPlanner: React.FC<PlannerProps> = (props: PlannerProps) => (
    <DragDropContext onDragEnd={result => onDragEnd(result, props.terms)}>
        {props.plan.terms.map((val: string) => {
            const { terms, plannedCourses } = props
            const courseArray = terms[val].courses.map((id: string) => ({
                id,
                ...plannedCourses[id]
            }))
            return (
                <div>
                    <h3>Term: {props.terms[val].name}</h3>
                    <PlannerList
                        items={courseArray}
                        id={val}
                        key={val}
                        delList={() => props.delTerm(val)}
                    />
                </div>
            )
        })}
        <button
            onClick={() =>
                props.addTerm({
                    name: Math.random()
                        .toString(36)
                        .substring(0, 5),
                    courses: [],
                    plan: props.plan.id as string
                })
            }
        >
            Add Term
        </button>
    </DragDropContext>
)

export const Planner = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedPlanner)

export default Planner
