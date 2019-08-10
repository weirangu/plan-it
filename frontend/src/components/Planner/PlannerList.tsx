import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'
import PlannerItem from 'components/Planner/PlannerItem'
import { ID, PlannerCourse } from 'reducers/types'
import { addPlannerCourse, deletePlannerCourse } from 'effects/plannerCourse'
import { withHover } from 'components/hoc/withHover'
import CourseInfo from 'components/CourseInfo/CourseInfo'
import AddPlannerItem from './AddPlannerItem'
import { deleteTerm } from 'effects/term'

/** The props for PlannerList. */
export interface PlannerListProps {
    id: string
    items: (PlannerCourse & ID)[]
}

const PlannerItemWithHover = withHover(PlannerItem, CourseInfo)

export const PlannerList: React.FC<PlannerListProps> = (
    props: PlannerListProps
) => {
    // addItem determines whether the user is trying to add a new course
    const [addItem, setAddItem] = useState<boolean>(false)
    const dispatch = useDispatch()

    const addCourse = useCallback(
        (course: string) => {
            dispatch(addPlannerCourse(course, props.id))
            setAddItem(false)
        },
        [dispatch, props.id]
    )

    const courses = props.items.map(
        (item: PlannerCourse & ID, index: number) => (
            <PlannerItemWithHover
                key={item.id}
                mainProps={{
                    id: item.id,
                    course: item,
                    index: index,
                    delete: () => dispatch(deletePlannerCourse(item.id))
                }}
                hoverProps={{
                    id: item.course
                }}
            />
        )
    )
    if (addItem) {
        courses.push(
            <AddPlannerItem
                key={'add planner item'}
                index={courses.length}
                add={addCourse}
                delete={() => setAddItem(false)}
            />
        )
    }

    return (
        <Droppable droppableId={props.id} key={props.id} direction="horizontal">
            {(provided: DroppableProvided) => (
                <>
                    <div
                        className="container"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {courses}
                        {provided.placeholder}
                    </div>
                    <div>
                        <button onClick={() => setAddItem(true)}>
                            Add Course
                        </button>
                        <button onClick={() => dispatch(deleteTerm(props.id))}>
                            Delete Term
                        </button>
                    </div>
                </>
            )}
        </Droppable>
    )
}

export default PlannerList
