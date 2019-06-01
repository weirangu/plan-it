import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Course } from 'reducers/state-types'
import PlannerItem from 'components/Planner/PlannerItem'

/** The props for PlannerList. */
export interface PlannerListProps {
    id: string
    items: Course[]
}

const PlannerList: React.FC<PlannerListProps> = (props: PlannerListProps) => (
    <Droppable droppableId={props.id} key={props.id}>
        {(provided: any) => (
            <div
                className="name"
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {props.items.map((item: Course, index: number) => (
                    <PlannerItem course={item} index={index} />
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
)

export default PlannerList
