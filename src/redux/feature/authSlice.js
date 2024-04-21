import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
import toast from 'react-hot-toast'

const initialState = {
  token: null,
  error: '',
  loading: false
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.login(formValue)
      toast.success('Login Successfully')
      navigate('/')
      return response.data
    } catch (err) {
      toast.error(err.response.data.message)
      return rejectWithValue(err.response.data)
    }
  }
)

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ email, googleId, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.googleLogin(email, googleId)
      toast.success('Login Successfully')
      navigate('/')
      return response.data
    } catch (err) {
      toast.error(err.response.data.message)
      return rejectWithValue(err.response.data)
    }
  }
)
// setUser
export const register = createAsyncThunk(
  'auth/register',
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.register(formValue)
      toast.success('Register Successfully')
      navigate('/')
      return response.data
    } catch (err) {
      toast.error(err.response.data.message)
      return rejectWithValue(err.response.data)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = await api.logout()
      toast.success('Logout Successfully')
      navigate('/')
      window.location.reload()
      return response.data
    } catch (err) {
      toast.error(err.response.data.message)
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
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem(
        'profile',
        JSON.stringify({ ...action.payload.metadata.tokens })
      )

      state.token = action.payload.metadata.tokens.accessToken
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [googleLogin.pending]: (state, action) => {
      state.loading = true
    },
    [googleLogin.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem(
        'profile',
        JSON.stringify({ ...action.payload.metadata.tokens })
      )

      state.token = action.payload.metadata.tokens.accessToken
    },
    [googleLogin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [register.pending]: (state, action) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem(
        'profile',
        JSON.stringify({ ...action.payload.metadata.tokens })
      )
      state.token = action.payload.metadata.tokens.accessToken
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [logout.pending]: (state, action) => {
      state.loading = true
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false
      state.token = null
      localStorage.clear()
    },
    [logout.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions

export default authSlice.reducer
