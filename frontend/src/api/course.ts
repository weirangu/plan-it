import axios from 'api'
import { Course } from 'reducers/types'

export async function getCourseAPI(id: string): Promise<Course> {
    const resp = await axios.get(`/courses/${id}/`)
    return resp.data
}
