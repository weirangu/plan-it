import axios, { AxiosPromise, AxiosResponse } from 'axios'

export function getCourseDetails (id: string): AxiosPromise<AxiosResponse> {
    return axios.get(`http://localhost:8000/courses/`)
}
