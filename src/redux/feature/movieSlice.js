import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  movie: {},
  movies: [],
  relatedMovies: [],
  currentPage: 1,
  numberOfPages: null,
  error: '',
  loading: false
}

export const getMovies = createAsyncThunk(
  'movie/getMovies',
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getMovies(page)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMovie = createAsyncThunk(
  'movie/getMovie',
  async (alias, { rejectWithValue }) => {
    try {
      const response = await api.getMovie(alias)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createMovie = createAsyncThunk(
  'movie/createMovie',
  async ({ movieData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createMovie(movieData)

      toast.success('Create movie successfully')
      navigate('/')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateMovie = createAsyncThunk(
  'movie/updateMovie',
  async ({ movieData, navigate, toast }, { rejectWithValue }) => {
    try {
      const movieId = movieData._id
      const response = await api.updateMovie(movieData, movieId)

      toast.success('Update movie successfully')
      navigate('/')

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteMovie = createAsyncThunk(
  'movie/deleteMovie',
  async ({ movieId, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteMovie(movieId)
      toast.success('Delete movie successfully')
      navigate('/')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getRelatedMovies = createAsyncThunk(
  'movie/relatedMovies',
  async ({ movieId, genre }, { rejectWithValue }) => {
    try {
      const relatedMovieData = { movieId, genre }
      const response = await api.getRelatedMovies(relatedMovieData)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: {
    [getMovies.pending]: (state, action) => {
      state.loading = true
    },
    [getMovies.fulfilled]: (state, action) => {
      state.loading = false
      state.movies = action.payload.metadata.movies
      state.numberOfPages = action.payload.metadata.numberOfPages
      state.currentPage = action.payload.metadata.currentPage
    },
    [getMovies.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getMovie.pending]: (state, action) => {
      state.loading = true
    },
    [getMovie.fulfilled]: (state, action) => {
      state.loading = false
      state.movie = action.payload.metadata
    },
    [getMovie.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [createMovie.pending]: (state, action) => {
      state.loading = true
    },
    [createMovie.fulfilled]: (state, action) => {
      state.loading = false
    },
    [createMovie.rejected]: (state, action) => {
      state.error = action.payload.message
      state.loading = false
    },
    [updateMovie.pending]: (state, action) => {
      state.loading = true
    },
    [updateMovie.fulfilled]: (state, action) => {
      state.loading = false
    },
    [updateMovie.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deleteMovie.pending]: (state, action) => {
      state.loading = true
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.loading = false
    },
    [deleteMovie.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getRelatedMovies.pending]: (state, action) => {
      state.loading = true
    },
    [getRelatedMovies.fulfilled]: (state, action) => {
      state.loading = false
      state.relatedMovies = action.payload.metadata
    },
    [getRelatedMovies.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export default movieSlice.reducer
