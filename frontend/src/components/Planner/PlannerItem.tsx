import React, { ReactNode } from 'react'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import { PlannerCourse } from 'store/reducers/types'
import styles from './PlannerItem.module.css'

/** The props used for PlannerItem. */
export interface PlannerItemProps {
    id: string
    index: number
    onDelete: () => any // The function that deletes this PlannerItem
    children: ReactNode
}

const PlannerItem: React.FC<PlannerItemProps> = (props: PlannerItemProps) => (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
        {(provided: DraggableProvided) => {
            return (
                <div
                    ref={provided.innerRef}
                    className={styles.container}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {props.children}
                    <button
                        onClick={props.onDelete}
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
