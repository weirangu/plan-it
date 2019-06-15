import React from 'react'
import { Course } from 'reducers/types'

const CourseInfo: React.FC<Course> = (props: Course) => {
    return (
        <div>
            <p>{props.code}</p>
        </div>
    )
}

export default CourseInfo
