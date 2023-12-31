import axios from 'axios'

const devEnv = process.env.NODE_ENV !== 'production'

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization'
}

const API_KEY =
  '348f099c3d38f205a8e6391839920cb6c0761b628b0e060caf91bc4f28a94e9da953aa642b562c04987c2bbdd7dcfeaf5c5e893334d9313ba55736093d332d9b'

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env
console.log(REACT_APP_DEV_API)
const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
  withCredentials: true
})

API.interceptors.request.use(req => {
  if (localStorage.getItem('userId')) {
    req.headers[HEADER.CLIENT_ID] = ` ${
      JSON.parse(localStorage.getItem('userId')).userId
    }`
  }

  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).accessToken
    }`
  }

  req.headers['x-api-key'] = API_KEY

  return req
})

API.interceptors.response.use(
  async res => {
    return res
  },
  async error => {
    console.log('err response ne', error)

    const config = error.config
    console.log('config', config)

    if (config.url.includes('/v1/api/user/login')) {
      // Nhung route khong can check Token
      return error
    }

    const { code, message } = error.response.data
    console.log('message error', message)
    if (message && message === 'jwt expired' && code && code === 401) {
      console.log('TH het han token')
      // 1 - Get token from refreshToken
      const {
        metadata: { tokens }
      } = await handleRefreshToken()
      console.log('tokens', tokens)
      if (tokens) {
        localStorage.setItem('profile', JSON.stringify(tokens))

        return API(config)
      }
    }

    return Promise.reject(error)
  }
)

// Auth
export const login = formData => API.post('/v1/api/user/login', formData)
export const register = formData => API.post('/v1/api/user/register', formData)
export const logout = () => API.post('/v1/api/user/logout')
export const refreshToken = () => API.post('/v1/api/user/refreshToken')

// Movie
export const getMovies = page => API.get(`/movie?page=${page}`)
export const getMovie = alias => API.get(`/movie/${alias}`)
export const createMovie = movieData => API.post(`/movie`, movieData)
export const updateMovie = (movieData, alias) =>
  API.patch(`/movie/${alias}`, movieData)
export const deleteMovie = alias => API.delete(`/movie/${alias}`)

export const getRelatedMovies = relatedMovieData =>
  API.post(`/movie/related`, relatedMovieData)

// Watchlist
export const getWatchlist = userId => API.get(`/watchlist/?userId=${userId}`)

export const addToWatchlist = (userId, movieId) =>
  API.post(`/watchlist`, { userId, movieId })

export const removeFromWatchlist = (userId, movieId, alias) =>
  API.delete(`/watchlist`, {
    data: { userId, movieId, alias }
  })

// Rate
export const rateMovie = (userId, movieId, rateValue) =>
  API.post(`/rate`, { userId, movieId, rateValue })

export const updateRatingMovie = (userId, movieId, rateValue, oldRateValue) =>
  API.patch(`/rate`, { userId, movieId, rateValue, oldRateValue })

export const getRatedMovie = userId => API.get(`/rate/${userId}`)

const handleRefreshToken = async () => {
  try {
    const response = await refreshToken()

    return response.data
  } catch (err) {
    return Promise.reject(err)
  }
}
