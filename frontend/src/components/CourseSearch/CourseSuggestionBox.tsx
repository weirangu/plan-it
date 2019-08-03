import React, { useEffect, useState } from 'react'
import Suggestion from './Suggestion'
import { searchCoursesAPI } from 'api/course'
import { Course } from '../../reducers/types'

export interface CourseSuggestionBoxProps {
    search: string
    onSelectSuggestion: (course: Course) => void
}

const CourseSuggestionBox: React.FC<CourseSuggestionBoxProps> = (
    props: CourseSuggestionBoxProps
) => {
    const [list, setList] = useState<Course[]>([] as Course[])

    useEffect(() => {
        if (props.search.length < 3) {
            // The string is too short to do a search
            return
        }
        searchCoursesAPI(props.search).then(setList)
    }, [props.search])

    return (
        <div>
            <ul>
                {list.map((course: Course) => (
                    <Suggestion
                        code={course.code}
                        name={course.name}
                        key={course.code}
                        onClick={() => props.onSelectSuggestion(course)}
                    />
                ))}
            </ul>
        </div>
    )
}

export default CourseSuggestionBox
