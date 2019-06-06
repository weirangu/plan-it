import axios, { AxiosResponse, AxiosPromise } from 'axios'

export default function getCourseDetails (id: string): AxiosPromise<AxiosResponse> {
    return axios.get(`http://localhost:8000/courses/`)
}
