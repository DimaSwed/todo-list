import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001'
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)
