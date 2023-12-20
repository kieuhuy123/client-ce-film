import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  rated: [],
  movieIsRating: {},
  openDialog: false,
  error: '',
  loading: false
}

export const rateMovie = createAsyncThunk(
  'rating/rateMovie',
  async ({ userId, movieId, rateValue }, { rejectWithValue }) => {
    try {
      const response = await api.rateMovie(userId, movieId, rateValue)
      setOpen(false)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateRatingMovie = createAsyncThunk(
  'rating/updateRating',
  async ({ userId, movieId, rateValue, oldRateValue }, { rejectWithValue }) => {
    try {
      const response = await api.updateRatingMovie(
        userId,
        movieId,
        rateValue,
        oldRateValue
      )
      setOpen(false)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const getRateMovie = createAsyncThunk(
  'rating/getRated',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getRatedMovie(userId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.openDialog = action.payload
    },
    setMovieIsRating: (state, action) => {
      state.movieIsRating = action.payload
    }
  },
  extraReducers: {
    [rateMovie.pending]: (state, action) => {
      state.loading = true
    },
    [rateMovie.fulfilled]: (state, action) => {
      state.loading = false
      state.rated = [...state.rated, { ...action.payload }]
    },
    [rateMovie.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getRateMovie.pending]: (state, action) => {
      state.loading = true
    },
    [getRateMovie.fulfilled]: (state, action) => {
      state.loading = false
      state.rated = action.payload
    },
    [getRateMovie.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [updateRatingMovie.pending]: (state, action) => {
      state.loading = true
    },
    [updateRatingMovie.fulfilled]: (state, action) => {
      state.loading = false

      const {
        arg: { movieId }
      } = action.meta

      if (movieId) {
        state.rated = state.rated.filter(item => item.movieId !== movieId)
      }

      state.rated = [...state.rated, { ...action.payload }]
    },
    [updateRatingMovie.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export const { setOpen, setMovieIsRating } = ratingSlice.actions

export default ratingSlice.reducer
