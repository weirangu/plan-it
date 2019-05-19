import React from 'react'
import Course from 'types/course'

const CourseInfo: React.FC<Course> = (props: Course) => {
    return (
        <div>
            <p>{props.code}</p>
            <p>{props.name}</p>
            <p>{props.description}</p>
            <p>{props.faculty}</p>
            <p>{props.department}</p>
            <p>{props.prerequisites}</p>
            <p>{props.exclusions}</p>
            <p>{props.level}</p>
            <p>{props.campus}</p>
            <p>{props.term}</p>
            <p>{props.breadth1}</p>
            <p>{props.breadth2}</p>
        </div>
    )
}

export default CourseInfo
