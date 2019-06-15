import { moveCourse } from 'actions/course-actions'
import { addTerm, deleteTerm } from 'actions/term-actions'
import PlannerList from 'components/Planner/PlannerList'
import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { Plan, Term } from 'reducers/types'
import { Dispatch } from 'redux'
import store from 'store'
import './planner.css'

export interface PlannerProps {
    plan: Plan
    add: (termID: string, term: Term) => any // Provided by mapDispatchToProps
    del: (termID: string) => any // Provided by mapDispatchToProps
}

function mapStateToProps (state: Plan): { plan: Plan } {
    return { plan: state }
}

function mapDispatchToProps (dispatch: Dispatch) {
    return {
        add: (termID: string, term: Term) =>
            dispatch(addTerm({ term, termID })),
        del: (termID: string) => dispatch(deleteTerm({ termID }))
    }
}

// Runs when the user finishes dragging
function onDragEnd (result: DropResult): void {
    if (!result.destination) {
        return
    }
    store.dispatch(
        moveCourse({
            oldIndex: result.source.index,
            oldTermID: result.source.droppableId,
            newTermID: result.destination.droppableId,
            newIndex: result.destination.index
        })
    )
}

// Redux should feed us the props
const ConnectedPlanner: React.FC<PlannerProps> = (props: PlannerProps) => (
    <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(props.plan.terms).map((val: [string, Term]) => (
            <div>
                <h3>Term: {val[1].name}</h3>
                <PlannerList
                    items={val[1].courses}
                    id={val[0]}
                    key={val[0]}
                    delList={() => props.del(val[0])}
                />
            </div>
        ))}
        <button
            onClick={() =>
                props.add(
                    Math.random()
                        .toString(36)
                        .substring(5),
                    {
                        name: Math.random()
                            .toString(36)
                            .substring(6),
                        courses: []
                    }
                )
            }>
            Add Term
        </button>
    </DragDropContext>
)

export const Planner = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedPlanner)

export default Planner
