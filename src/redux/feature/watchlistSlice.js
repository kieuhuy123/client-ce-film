import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

import toast from 'react-hot-toast'
const initialState = {
  watchlist: [],
  error: '',
  loading: false,
  addInLoading: { inLoading: false, movieId: '' }
}

export const getWatchlist = createAsyncThunk(
  'watchlist/getWatchlist',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getWatchlist(userId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addToWatchlist = createAsyncThunk(
  'watchlist/addToWatchlist',
  async ({ userId, movieId }, { rejectWithValue }) => {
    try {
      const response = await api.addToWatchlist(userId, movieId)
      toast.success('Thêm phim vào danh sách')
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

export const removeFromWatchlist = createAsyncThunk(
  'watchlist/removeFromWatchlist',
  async ({ userId, movieId, alias }, { rejectWithValue }) => {
    try {
      const response = await api.removeFromWatchlist(userId, movieId, alias)
      toast.success('Xóa phim khỏi danh sách')
      console.log('response', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: {
    [getWatchlist.pending]: (state, action) => {
      state.loading = true
    },
    [getWatchlist.fulfilled]: (state, action) => {
      state.loading = false
      state.watchlist =
        action.payload?.metadata?.watchlist_movies ?? initialState.watchlist
    },
    [getWatchlist.rejected]: (state, action) => {
      state.error = action.payload.message
    },
    [addToWatchlist.pending]: (state, action) => {
      const {
        arg: { movieId }
      } = action.meta

      state.addInLoading = { inLoading: true, movieId }
    },
    [addToWatchlist.fulfilled]: (state, action) => {
      state.watchlist =
        action.payload?.metadata?.watchlist_movies ?? initialState.watchlist
      state.addInLoading = initialState.addInLoading
    },
    [addToWatchlist.rejected]: (state, action) => {
      state.error = action.payload.message
      state.addInLoading = initialState.addInLoading
    },
    [removeFromWatchlist.pending]: (state, action) => {
      const {
        arg: { movieId }
      } = action.meta

      state.addInLoading = { inLoading: true, movieId }
    },
    [removeFromWatchlist.fulfilled]: (state, action) => {
      const {
        arg: { movieId }
      } = action.meta

      if (movieId) {
        state.watchlist = state.watchlist.filter(item => item._id !== movieId)
      }
      state.addInLoading = initialState.addInLoading
    },
    [removeFromWatchlist.rejected]: (state, action) => {
      state.error = action.payload.message
      state.addInLoading = initialState.addInLoading
    }
  }
})

export default watchlistSlice.reducer
