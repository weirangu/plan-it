import axios from 'axios'

export const axiosAPIInstance = axios.create({
    baseURL: 'http://localhost:8000'
})

export default axiosAPIInstance
