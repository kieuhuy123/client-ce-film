import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  movie: {},
  movies: [],
  featuredMovies: [],
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

export const getMovieByAlias = createAsyncThunk(
  'movie/getMovieByAlias',
  async (alias, { rejectWithValue }) => {
    try {
      const response = await api.getMovieByAlias(alias)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMovieByType = createAsyncThunk(
  'movie/getMovieByType',
  async ({ type, getPage: page }, { rejectWithValue }) => {
    try {
      const response = await api.getMovieByType(type, page)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMovieByGenre = createAsyncThunk(
  'movie/getMovieByGenre',
  async ({ genre, getPage: page }, { rejectWithValue }) => {
    try {
      const response = await api.getMovieByGenre(genre, page)
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
      toast.error(error.response.data.message)
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

export const getMovieByKeyword = createAsyncThunk(
  'movie/getMovieByKeyword',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.getMovieByKeyword(keyword)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getFeaturedMovie = createAsyncThunk(
  'movie/getFeaturedMovie',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.getFeaturedMovie()

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
    [getMovieByAlias.pending]: (state, action) => {
      state.loading = true
    },
    [getMovieByAlias.fulfilled]: (state, action) => {
      state.loading = false
      state.movie = action.payload.metadata
    },
    [getMovieByAlias.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getMovieByGenre.pending]: (state, action) => {
      state.loading = true
    },
    [getMovieByGenre.fulfilled]: (state, action) => {
      state.loading = false
      state.movies = action.payload.metadata.movies
      state.numberOfPages = action.payload.metadata.numberOfPages
      state.currentPage = action.payload.metadata.currentPage
    },
    [getMovieByGenre.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getMovieByType.pending]: (state, action) => {
      state.loading = true
    },
    [getMovieByType.fulfilled]: (state, action) => {
      state.loading = false
      state.movies = action.payload.metadata.movies
      state.numberOfPages = action.payload.metadata.numberOfPages
      state.currentPage = action.payload.metadata.currentPage
    },
    [getMovieByType.rejected]: (state, action) => {
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
    },
    [getMovieByKeyword.pending]: (state, action) => {
      state.loading = true
    },
    [getMovieByKeyword.fulfilled]: (state, action) => {
      state.loading = false
      state.movies = action.payload.metadata
    },
    [getMovieByKeyword.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getFeaturedMovie.pending]: (state, action) => {
      state.loading = true
    },
    [getFeaturedMovie.fulfilled]: (state, action) => {
      state.loading = false
      state.featuredMovies = action.payload.metadata
    },
    [getFeaturedMovie.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})
// Action creators are generated for each case reducer function
export const { setCurrentPage } = movieSlice.actions

export default movieSlice.reducer
