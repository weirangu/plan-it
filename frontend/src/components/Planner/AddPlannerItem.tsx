import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

/** The props used for PlannerItem. */
export interface AddCourseItemProps {
    index: number
    add: (course: string) => any // The function that adds a PlannedCourse
    delete: () => any // The function that deletes this PlannerItem
}

const AddPlannerItem: React.FC<AddCourseItemProps> = (
    props: AddCourseItemProps
) => {
    const [course, setCourse] = useState<string>('')

    return (
        <Draggable
            key={'my props'}
            draggableId={'my props'}
            index={props.index}
        >
            {(provided: any) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div>
                        <input
                            type="text"
                            value={course}
                            onChange={e => setCourse(e.target.value)}
                            name="code"
                        />
                        <button onClick={() => props.add(course)}>Add</button>
                    </div>
                    <button onClick={props.delete}>X</button>
                </div>
            )}
        </Draggable>
    )
}

export default AddPlannerItem
