import React from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import PlannerItem from 'components/Planner/PlannerItem'
import { PlannedCourse, ID, State } from 'reducers/types'
import { addPlannedCourse, deletePlannedCourse } from 'effects/course'
import { ThunkDispatch } from 'redux-thunk'

/** The props for PlannerList. */
export interface PlannerListProps {
    id: string
    items: (PlannedCourse & ID)[]
    delList: () => any // Deletes this PlannerList
    add: (term: string) => any // Provided by mapDispatchToProps
    delItem: (id: string) => any // Provided by mapDispatchToProps
}

function mapDispatchToProps (dispatch: ThunkDispatch<State, void, AnyAction>) {
    return {
        add: (term: string) =>
            dispatch(
                addPlannedCourse(
                    Math.random()
                        .toString(36)
                        .substring(6),
                    term
                )
            ),
        delItem: (id: string) => dispatch(deletePlannedCourse(id))
    }
}

const ConnectedPlannerList: React.FC<PlannerListProps> = (
    props: PlannerListProps
) => (
    <Droppable droppableId={props.id} key={props.id} direction="horizontal">
        {(provided: any) => (
            <div>
                <div
                    className="name container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {props.items.map(
                        (item: PlannedCourse & ID, index: number) => (
                            <PlannerItem
                                id={item.id}
                                course={item}
                                index={index}
                                key={item.id}
                                delete={() => props.delItem(item.id)}
                            />
                        )
                    )}
                    {provided.placeholder}
                </div>
                <div>
                    <button onClick={() => props.add(props.id)}>
                        Add Course
                    </button>
                    <button onClick={props.delList}>Delete Term</button>
                </div>
            </div>
        )}
    </Droppable>
)

export const PlannerList = connect(
    null,
    mapDispatchToProps
)(ConnectedPlannerList)

export default PlannerList
