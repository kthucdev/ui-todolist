import axios from 'axios'

// In React (Create React App), environment variables must start with REACT_APP_
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(import.meta.env.VITE_BASE_URL);
    return response
  },
  (error) => {
    // Handle common errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
