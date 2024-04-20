import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
import toast from 'react-hot-toast'

const initialState = {
  rated: [],
  movieIsRating: {},
  openDialog: false,
  error: '',
  loading: false
}

export const rateMovie = createAsyncThunk(
  'rating/rateMovie',
  async ({ userId, movieId, ratingValue }, { rejectWithValue }) => {
    try {
      const response = await api.rateMovie(userId, movieId, ratingValue)
      setOpen(false)
      toast.success('Đánh giá thành công')
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateRatingMovie = createAsyncThunk(
  'rating/updateRating',
  async (
    { userId, movieId, ratingValue, oldRatingValue },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updateRatingMovie(
        userId,
        movieId,
        ratingValue,
        oldRatingValue
      )
      setOpen(false)
      toast.success('Đánh giá thành công')
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
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
      state.loading = false
    },
    [rateMovie.fulfilled]: (state, action) => {
      state.loading = false
      state.rated = [...state.rated, { ...action.payload.metadata }]
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
      state.rated = action.payload.metadata
    },
    [getRateMovie.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [updateRatingMovie.pending]: (state, action) => {
      // state.loading = true
    },
    [updateRatingMovie.fulfilled]: (state, action) => {
      // state.loading = false

      const {
        arg: { movieId }
      } = action.meta

      if (movieId) {
        state.rated = state.rated.filter(
          item => item.rating_movie._id !== movieId
        )
      }

      state.rated = [{ ...action.payload.metadata }, ...state.rated]
    },
    [updateRatingMovie.rejected]: (state, action) => {
      // state.loading = false
      state.error = action.payload.message
    }
  }
})

export const { setOpen, setMovieIsRating } = ratingSlice.actions

export default ratingSlice.reducer
