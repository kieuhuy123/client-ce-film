import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  token: null,
  error: '',
  loading: false
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue)
      toast.success('Login Successfully')
      navigate('/')
      return response.data
    } catch (err) {
      toast.error(err.response.data)
      return rejectWithValue(err.response.data)
    }
  }
)
// setUser
export const register = createAsyncThunk(
  'auth/register',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue)
      toast.success('Register Successfully')
      navigate('/')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setLogout: (state, action) => {
      state.token = null
      localStorage.clear()
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.token = action.payload.accessToken
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [register.pending]: (state, action) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.token = action.payload
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

// Action creators are generated for each case reducer function
export const { setToken, setLogout } = authSlice.actions

export default authSlice.reducer
