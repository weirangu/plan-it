import axios from 'api'
import { Course } from 'store/reducers/types'

export async function getCourseAPI(id: string): Promise<Course> {
    const resp = await axios.get<Course>(`/courses/${id}/`)
    return resp.data
}

export async function searchCoursesAPI(query: string): Promise<Course[]> {
    const resp = await axios.get<Course[]>(`/courses/?q=${query}`)
    return resp.data
}
