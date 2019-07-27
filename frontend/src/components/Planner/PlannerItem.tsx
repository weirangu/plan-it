import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { PlannerCourse } from 'reducers/types'

/** The props used for PlannerItem. */
export interface PlannerItemProps {
    id: string
    course: PlannerCourse
    index: number
    delete: () => any // The function that deletes this PlannerItem
}

const PlannerItem: React.FC<PlannerItemProps> = (props: PlannerItemProps) => (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
        {(provided: any) => (
            <div
                className="a class"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {props.course.course}
                <button onClick={props.delete}>X</button>
            </div>
        )}
    </Draggable>
)

export default PlannerItem
