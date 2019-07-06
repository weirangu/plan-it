import axios from 'api'

export async function getCourseDetails (id: string): Promise<any> {
    const resp = await axios.get(`/courses/${id}/`)
    return resp.data
}
