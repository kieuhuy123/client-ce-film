import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
import toast from 'react-hot-toast'

const initialState = {
  packages: [],
  error: '',
  loading: false
}

export const getPackage = createAsyncThunk(
  'package/getPackage',
  async ({ rejectWithValue }) => {
    try {
      const response = await api.getPackage()

      //   toast.success('Đánh giá thành công')
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {},
  extraReducers: {
    [getPackage.pending]: (state, action) => {
      state.loading = true
    },
    [getPackage.fulfilled]: (state, action) => {
      state.loading = false
      state.packages = action.payload?.metadata ?? initialState.packages
    },
    [getPackage.rejected]: (state, action) => {
      console.log('hello')
      // state.error = action.payload.message
    }
  }
})

// export const { setOpen, setMovieIsRating } = ratingSlice.actions

export default packageSlice.reducer
