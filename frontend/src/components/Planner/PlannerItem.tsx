import React from 'react'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import { PlannerCourse } from 'store/reducers/types'
import styles from './PlannerItem.module.css'

/** The props used for PlannerItem. */
export interface PlannerItemProps {
    id: string
    course: PlannerCourse
    index: number
    delete: () => any // The function that deletes this PlannerItem
}

const PlannerItem: React.FC<PlannerItemProps> = (props: PlannerItemProps) => (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
        {(provided: DraggableProvided) => {
            console.log(provided)
            return (
                <div
                    ref={provided.innerRef}
                    className={styles.container}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {props.course.course}
                    <button
                        onClick={props.delete}
                        className={styles.deleteButton}
                    >
                        X
                    </button>
                </div>
            )
        }}
    </Draggable>
)

export default PlannerItem
