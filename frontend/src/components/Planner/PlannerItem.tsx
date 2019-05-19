import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export interface PlannerItemData {
    id: string
    name: string
}

export interface PlannerItemProps extends PlannerItemData {
    index: number
}

const PlannerItem: React.FC<PlannerItemProps> = (props: PlannerItemProps) => {
    return (
        <Draggable key={props.id} draggableId={props.id} index={props.index}>
            {(provided: any) => (
                <div
                    className="a class"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {props.name}
                </div>
            )}
        </Draggable>
    )
}

export default PlannerItem
