import React from 'react'
import { Dispatch } from 'redux'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import store from 'store'
import { moveCourse } from 'actions/course-actions'
import { addTerm, deleteTerm } from 'actions/term-actions'
import { Plan, Course } from 'reducers/state-types'
import PlannerList from 'components/Planner/PlannerList'

export interface PlannerProps {
    plan: Plan
    add: (term: string) => any // Provided by mapDispatchToProps
    del: (term: string) => any // Provided by mapDispatchToProps
}

function mapStateToProps (state: Plan): { plan: Plan } {
    return { plan: state }
}

function mapDispatchToProps (dispatch: Dispatch) {
    return {
        add: (term: string) => dispatch(addTerm({ termID: term })),
        del: (term: string) => dispatch(deleteTerm({ termID: term }))
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
        {Object.entries(props.plan.terms).map((val: [string, Course[]]) => (
            <div>
                <h3>Term: {val[0]}</h3>
                <PlannerList
                    items={val[1]}
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
                        .substring(6)
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
