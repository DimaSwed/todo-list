import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:3001'
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)
