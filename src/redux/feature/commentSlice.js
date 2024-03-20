import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  comments: [],
  childComments: [],
  error: '',
  loading: false,
  loadingBtn: { inLoading: false, commentId: '' }
}

export const getComments = createAsyncThunk(
  'comment/getComments',
  async ({ movieId }, { rejectWithValue }) => {
    try {
      const response = await api.getComments(movieId)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCommentsByParentId = createAsyncThunk(
  'comment/getCommentsByParentId',
  async ({ movieId, parentCommentId }, { rejectWithValue }) => {
    try {
      const response = await api.getCommentsByParentId(movieId, parentCommentId)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createComment = createAsyncThunk(
  'comment/createComment',
  async (
    { movieId, userId, userEmail, content, parentCommentId },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createComment(
        movieId,
        userId,
        userEmail,
        content,
        parentCommentId
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async ({ commentId, movieId }, { rejectWithValue }) => {
    try {
      const response = await api.deleteComment(commentId, movieId)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    [getComments.pending]: (state, action) => {
      state.loading = true
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false
      state.comments = action.payload.metadata
    },
    [getComments.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getCommentsByParentId.pending]: (state, action) => {
      state.loading = true
    },
    [getCommentsByParentId.fulfilled]: (state, action) => {
      state.loading = false
      state.childComments = [...state.childComments, ...action.payload.metadata]
    },
    [getCommentsByParentId.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [createComment.pending]: (state, action) => {
      state.loading = true
    },
    [createComment.fulfilled]: (state, action) => {
      const {
        arg: { parentCommentId }
      } = action.meta

      state.loading = false
      if (parentCommentId) {
        state.childComments = [
          ...state.childComments,
          { ...action.payload.metadata }
        ]
      } else {
        state.comments = [...state.comments, { ...action.payload.metadata }]
      }
    },
    [createComment.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deleteComment.pending]: (state, action) => {
      // state.loading = true

      const {
        arg: { commentId }
      } = action.meta

      state.loadingBtn = { inLoading: true, commentId: commentId }
    },
    [deleteComment.fulfilled]: (state, action) => {
      // state.loading = false
      const {
        arg: { commentId }
      } = action.meta
      if (commentId) {
        state.comments = state.comments.filter(item => item._id !== commentId)
        state.childComments = state.childComments.filter(
          item => item._id !== commentId
        )
        state.loadingBtn = initialState.loadingBtn
      }
    },
    [deleteComment.rejected]: (state, action) => {
      // state.loading = false

      state.loadingBtn = initialState.loadingBtn
      state.error = action.payload.message
    }
  }
})

export default commentSlice.reducer
