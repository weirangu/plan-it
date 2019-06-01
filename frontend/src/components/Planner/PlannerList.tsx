import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import { Course } from 'reducers/state-types'
import PlannerItem from 'components/Planner/PlannerItem'
import { addCourse, deleteCourse } from 'actions/course-actions'

/** The props for PlannerList. */
export interface PlannerListProps {
    id: string
    items: Course[]
    delList: () => any // Deletes this PlannerList
    add: (term: string) => any // Provided by mapDispatchToProps
    delItem: (index: number, term: string) => any // Provided by mapDispathToProps
}

function mapDispatchToProps (dispatch: Dispatch) {
    return {
        add: (term: string) =>
            dispatch(
                addCourse({
                    course: {
                        code: Math.random()
                            .toString(36)
                            .substring(6)
                    },
                    termID: term
                })
            ),
        delItem: (index: number, term: string) =>
            dispatch(
                deleteCourse({
                    index: index,
                    termID: term
                })
            )
    }
}

const ConnectedPlannerList: React.FC<PlannerListProps> = (
    props: PlannerListProps
) => (
    <Droppable droppableId={props.id} key={props.id}>
        {(provided: any) => (
            <div
                className="name"
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {props.items.map((item: Course, index: number) => (
                    <PlannerItem
                        course={item}
                        index={index}
                        key={item.code}
                        delete={() => props.delItem(index, props.id)}
                    />
                ))}
                {provided.placeholder}
                <button onClick={() => props.add(props.id)}>Add Course</button>
                <button onClick={props.delList}>Delete Term</button>
            </div>
        )}
    </Droppable>
)

export const PlannerList = connect(
    null,
    mapDispatchToProps
)(ConnectedPlannerList)

export default PlannerList
