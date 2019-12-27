import { getCourse } from 'store/effects/course'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CourseReducerState } from 'store/reducers/courseReducer'
import styles from 'components/CourseInfo/CourseInfo.module.css'
import { selectCourse } from 'store/selectors'
import { RootState } from 'store/reducers/types'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

export interface CourseInfoProps {
    id: string
}

export const CourseInfo: React.FC<CourseInfoProps> = ({
    id
}: CourseInfoProps) => {
    const courses: CourseReducerState = useSelector(selectCourse)
    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch()
    const course = courses[id]
    switch (course) {
        case undefined:
            dispatch(getCourse(id))
            return (
                <div className={styles.courseInfo}>
                    <p>Loading course info...</p>
                </div>
            )
        case null:
            return (
                <div className={styles.courseInfo}>
                    <p>Information for {id} could not be found.</p>
                </div>
            )
        default:
            return (
                <div className={styles.courseInfo}>
                    <h1>{course.code}</h1>
                    <h2>{course.name}</h2>
                    {course.description && (
                        <p>Description: {course.description}</p>
                    )}
                    {course.prerequisites && (
                        <p>Prerequisites: {course.prerequisites}</p>
                    )}
                    {course.exclusions && (
                        <p>Exclusions: {course.exclusions}</p>
                    )}
                    {course.faculty && <p>Faculty: {course.faculty}</p>}
                    {course.campus && <p>Campus: {course.campus}</p>}
                </div>
            )
    }
}

export default CourseInfo
