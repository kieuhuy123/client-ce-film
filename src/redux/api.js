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
    const config = error.config

    if (config.url.includes('/v1/api/user/login')) {
      // Nhung route khong can check Token
      return error
    }

    const { code, message } = error.response.data
    console.log('message error', message)

    if (message && message === 'accessToken expired' && code && code === 401) {
      console.log('TH het han token')
      // 1 - Get token from refreshToken
      const {
        metadata: { tokens }
      } = await handleRefreshToken()

      if (tokens) {
        localStorage.setItem('profile', JSON.stringify(tokens))

        return API(config)
      }
    }

    if (
      message &&
      (message === 'refreshToken expired' ||
        message === 'Invalid refreshToken' ||
        message === 'Not found keyStore' ||
        message === 'Something wrong happen!! Please reLogin')
    ) {
      localStorage.clear()
      window.location.reload()
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
export const getMovies = page => API.get(`/v1/api/movie?page=${page}`)

export const getMovieByAlias = alias => API.get(`/v1/api/movie/${alias}`)
export const createMovie = movieData => API.post(`/v1/api/movie`, movieData)

export const getMovieByType = (type, page) =>
  API.get(`/v1/api/movie/type/${type}?&page=${page}`)

export const updateMovie = (movieData, movieId) =>
  API.patch(`/v1/api/movie/${movieId}`, movieData)

export const deleteMovie = movieId => API.delete(`/v1/api/movie/${movieId}`)

export const getRelatedMovies = relatedMovieData =>
  API.post(`/v1/api/movie/related`, relatedMovieData)

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
