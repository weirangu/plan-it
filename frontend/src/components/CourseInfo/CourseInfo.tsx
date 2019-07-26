import { getCourse } from 'effects/course'
import React from 'react'
import { useSelector } from 'react-redux'
import { CourseReducerState } from 'reducers/courseReducer'
import './CourseInfo.css'
import { selectCourse } from 'selectors'

export interface CourseInfoProps {
    id: string
}

export const CourseInfo: React.FC<CourseInfoProps> = ({
    id
}: CourseInfoProps) => {
    const courses: CourseReducerState = useSelector(selectCourse)
    const course = courses[id]

    if (course === undefined) {
        getCourse(id)
        return <div>Loading course info...</div>
    } else {
        return (
            <div className="courseInfo">
                <h1>{course.code}</h1>
                <h2>{course.name}</h2>
                <p>Prerequisites: {course.prerequisites}</p>
                <p>Exclusions: {course.exclusions}</p>
                <p>Faculty: {course.faculty}</p>
                <p>Campus: {course.campus}</p>
            </div>
        )
    }
}

export default CourseInfo
