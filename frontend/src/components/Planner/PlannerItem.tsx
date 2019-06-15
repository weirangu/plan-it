import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Course } from 'reducers/types'

/** The props used for PlannerItem. */
export interface PlannerItemProps {
    course: Course
    index: number
    delete: () => any // The function that deletes this PlannerItem
}

const PlannerItem: React.FC<PlannerItemProps> = (
    props: PlannerItemProps
) => {
    return (
        <Draggable
            key={props.course.code}
            draggableId={props.course.code}
            index={props.index}>
            {(provided: any) => (
                <div
                    className="a class"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {props.course.code}
                    <button onClick={props.delete}>X</button>
                </div>
            )}
        </Draggable>
    )
}

export default PlannerItem
