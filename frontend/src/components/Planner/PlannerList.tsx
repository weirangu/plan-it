import CourseInfo from 'components/CourseInfo/CourseInfo'
import { withHover } from 'components/hoc/withHover'
import PlannerItem from 'components/Planner/PlannerItem'
import React, { useCallback, useState } from 'react'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import {
    addPlannerCourse,
    deletePlannerCourse
} from 'store/effects/plannerCourse'
import { PlannerCourseReducerState } from 'store/reducers/plannerCourseReducer'
import { ID, Term, TermMonth } from 'store/reducers/types'
import { selectPlannerCourse } from 'store/selectors'
import AddPlannerItem from './AddPlannerItem'
import styles from './PlannerList.module.css'

/** The props for PlannerList. */
export interface PlannerListProps {
    term: Term & ID
}

/**
 * Maps a month to the name of a term.
 * @param month The month to get the name of the term of.
 */
function mapMonthToTerm(month: TermMonth): string {
    switch (month) {
        case 1:
            return 'Winter'
        case 5:
            return 'Summer F'
        case 7:
            return 'Summer S'
        case 9:
            return 'Fall'
        default:
            throw new Error('Month is not one of 1, 5, 7, 9!')
    }
}

const PlannerItemWithHover = withHover(PlannerItem, CourseInfo)

export const PlannerList: React.FC<PlannerListProps> = (
    props: PlannerListProps
) => {
    const {
        id,
        year,
        month,
        courses
    }: {
        id: string
        year: number
        month: TermMonth
        courses: string[]
    } = props.term
    // addItem determines whether the user is trying to add a new course
    const [addItem, setAddItem] = useState<boolean>(false)
    const plannerCourses: PlannerCourseReducerState = useSelector(
        selectPlannerCourse
    )
    const dispatch = useDispatch()

    const addCourse = useCallback(
        (course: string) => {
            dispatch(addPlannerCourse(course, props.term.id))
            setAddItem(false)
        },
        [dispatch, props.term.id]
    )

    const listItems: JSX.Element[] = courses.map(
        (courseID: string, index: number) => (
            <PlannerItemWithHover
                key={courseID}
                mainProps={{
                    id: courseID,
                    index: index,
                    onDelete: () => dispatch(deletePlannerCourse(courseID)),
                    children: plannerCourses[courseID].course
                }}
                hoverProps={{
                    id: plannerCourses[courseID].course
                }}
            />
        )
    )
    if (addItem) {
        listItems.push(
            <AddPlannerItem
                key={'add planner item'}
                index={listItems.length}
                add={addCourse}
                delete={() => setAddItem(false)}
            />
        )
    }

    return (
        <Droppable droppableId={id} key={id} direction="vertical">
            {(provided: DroppableProvided) => (
                <div key={id} className={styles.container}>
                    <h3 className={styles.header}>
                        {year.toString()} {mapMonthToTerm(month)}
                    </h3>
                    <div
                        className={styles.items}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {listItems}
                        {provided.placeholder}
                    </div>
                    <div>
                        <button onClick={() => setAddItem(true)}>
                            Add Course
                        </button>
                    </div>
                </div>
            )}
        </Droppable>
    )
}

export default PlannerList
