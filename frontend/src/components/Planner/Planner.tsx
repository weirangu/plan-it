import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import store from 'store'
import { moveCourse } from 'actions/course-actions'
import { Plan, Course } from 'reducers/state-types'
import PlannerList from 'components/Planner/PlannerList'

function mapStateToProps (state: Plan): Plan {
    return state
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
const ConnectedPlanner: React.FC<Plan> = (props: Plan) => (
    <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(props.terms).map((val: [string, Course[]]) => (
            <PlannerList items={val[1]} id={val[0]} key={val[0]} />
        ))}
    </DragDropContext>
)

export const Planner = connect(mapStateToProps)(ConnectedPlanner)

export default Planner
