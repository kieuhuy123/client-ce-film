import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  watchlist: [],
  error: '',
  loading: false,
  addInLoading: { inLoading: false, movieId: '' }
}

export const getWatchlist = createAsyncThunk(
  'watchlist/getWatchlist',
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await api.getWatchlist(userEmail)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addToWatchlist = createAsyncThunk(
  'watchlist/addToWatchlist',
  async ({ movieData, userEmail, toast }, { rejectWithValue }) => {
    try {
      let { _id, title, alias, image, rate } = movieData
      const watchlistData = {
        movie_id: _id,
        user_email: userEmail,
        title,
        alias,
        image,
        rate
      }
      const response = await api.addToWatchlist(watchlistData)
      toast.success('Add film to watchlist')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const removeFromWatchlist = createAsyncThunk(
  'watchlist/removeFromWatchlist',
  async ({ userEmail, movieId, toast }, { rejectWithValue }) => {
    try {
      const response = await api.removeFromWatchlist(movieId, userEmail)
      toast.success('Remove film from watchlist')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: {
    [getWatchlist.pending]: (state, action) => {
      state.loading = true
    },
    [getWatchlist.fulfilled]: (state, action) => {
      state.loading = false
      state.watchlist = action.payload
    },
    [getWatchlist.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [addToWatchlist.pending]: (state, action) => {
      const {
        arg: { movieData }
      } = action.meta
      // console.log('movieData', movieData)

      state.addInLoading = { inLoading: true, movieId: movieData._id }
    },
    [addToWatchlist.fulfilled]: (state, action) => {
      state.loading = false
      state.watchlist = [...state.watchlist, { ...action.payload.data }]
      state.addInLoading = initialState.addInLoading
    },
    [addToWatchlist.rejected]: (state, action) => {
      state.loading = false

      state.error = action.payload.message
      state.addInLoading = initialState.addInLoading
    },
    [removeFromWatchlist.pending]: (state, action) => {
      state.loading = true
      const {
        arg: { movieId }
      } = action.meta

      console.log('movieId', movieId)

      state.addInLoading = { inLoading: true, movieId }
    },
    [removeFromWatchlist.fulfilled]: (state, action) => {
      state.loading = false
      const {
        arg: { movieId }
      } = action.meta

      if (movieId) {
        state.watchlist = state.watchlist.filter(
          item => item.movie_id !== movieId
        )
      }
      state.addInLoading = initialState.addInLoading
    },
    [removeFromWatchlist.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.addInLoading = initialState.addInLoading
    }
  }
})

// Action creators are generated for each case reducer function
export const { setToken, setLogout } = authSlice.actions

export default authSlice.reducer
