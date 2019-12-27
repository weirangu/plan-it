import axios from 'api'
import { Course } from 'store/reducers/types'

export async function getCourseAPI(id: string): Promise<Course | null> {
    try {
        const resp = await axios.get<Course>(`/courses/${id}/`)
        return resp.data
    } catch (err) {
        if (err.response?.status === 404) {
            // We got a 404 response code from the backend
            return null
        }
        throw err
    }
}

export async function searchCoursesAPI(query: string): Promise<Course[]> {
    const resp = await axios.get<Course[]>(`/courses/?q=${query}`)
    return resp.data
}
