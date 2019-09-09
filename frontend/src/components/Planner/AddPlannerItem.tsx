import React, { ChangeEvent, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import CourseSuggestionBox from 'components/CourseSearch/CourseSuggestionBox'
import { Course } from 'store/reducers/types'
import styles from './AddPlannerItem.module.css'

/** The props used for PlannerItem. */
export interface AddCourseItemProps {
    index: number
    add: (course: string) => any // The function that adds a PlannerCourse
    delete: () => any // The function that deletes this PlannerItem
}

const AddPlannerItem: React.FC<AddCourseItemProps> = (
    props: AddCourseItemProps
) => {
    const [course, setCourse] = useState<string>('')

    function onCourseSearchChange(event: ChangeEvent<HTMLInputElement>): void {
        setCourse(event.target.value)
    }

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
                    className={styles.container}
                >
                    <input
                        type="search"
                        value={course}
                        onChange={onCourseSearchChange}
                        className={styles.searchBox}
                    />
                    <CourseSuggestionBox
                        search={course}
                        onSelectSuggestion={(course: Course) =>
                            setCourse(course.code)
                        }
                    />
                    <button onClick={() => props.add(course)}>Add</button>
                    <button onClick={props.delete}>X</button>
                </div>
            )}
        </Draggable>
    )
}

export default AddPlannerItem
