/* eslint-disable prettier/prettier */
import axios from 'axios'

// Set up a default instance of axios
const instance = axios.create({
  baseURL: 'http://localhost:5000', // Ganti dengan base URL backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to include the token in every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default instance
