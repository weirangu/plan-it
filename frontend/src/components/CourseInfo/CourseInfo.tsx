import { getCourse } from 'effects/course'
import React from 'react'
import { connect } from 'react-redux'
import { CourseReducerState } from 'reducers/courseReducer'
import { State } from 'reducers/types'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import './CourseInfo.css'

export interface CourseInfoProps {
    id: string
    courses: CourseReducerState
    getCourse: (course: string) => any
}

function mapStateToProps(state: State): State {
    return state
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, AnyAction>) {
    return {
        getCourse: (course: string) => dispatch(getCourse(course))
    }
}

const ConnectedCourseInfo: React.FC<CourseInfoProps> = (
    props: CourseInfoProps
) => {
    const { id, courses, getCourse } = props
    if (courses[id] !== undefined) {
        const course = courses[id]
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
    } else {
        getCourse(id)
        return <div>Loading course info...</div>
    }
}

export const CourseInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCourseInfo)

export default CourseInfo
