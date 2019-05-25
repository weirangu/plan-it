import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import PlannerItem, { PlannerItemData } from 'components/Planner/PlannerItem'

export interface PlannerListProps {
    id: string
    items: PlannerItemData[]
}

const PlannerList: React.FC<PlannerListProps> = (props: PlannerListProps) => {
    return (
        <Droppable droppableId={props.id} key={props.id}>
            {(provided: any) => (
                <div
                    className="name"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {props.items.map((item: PlannerItemData, index: number) => (
                        <PlannerItem {...item} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default PlannerList