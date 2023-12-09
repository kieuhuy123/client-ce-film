import axios from 'axios'

const devEnv = process.env.NODE_ENV !== 'production'

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env
console.log(REACT_APP_DEV_API)
const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`
})

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const signIn = formData => API.post('/auth/login', formData)
export const signUp = formData => API.post('/user/signup', formData)

export const getMovies = page => API.get(`/movie?page=${page}`)
export const getMovie = alias => API.get(`/movie/${alias}`)
export const createMovie = movieData => API.post(`/movie`, movieData)
export const updateMovie = (movieData, alias) =>
  API.patch(`/movie/${alias}`, movieData)
export const deleteMovie = alias => API.delete(`/movie/${alias}`)
