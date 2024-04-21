import React, { useState } from 'react'
import { Box, Button, FormControl, FormGroup, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createComment } from '../redux/feature/commentSlice'
import { useNavigate } from 'react-router-dom'
// import Textarea from '@mui/joy/Textarea'

const CommentForm = ({
  movieId,
  userId,
  userEmail,
  parentCommentId,
  loading
}) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChangeContent = e => {
    setContent(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!userId) return navigate('/login')

    if (content) {
      dispatch(
        createComment({ movieId, userId, userEmail, content, parentCommentId })
      )
      setContent('')
    }
  }
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          name='content'
          type='text'
          value={content}
          placeholder='Your spicey comment'
          label='Comment'
          disabled={loading}
          fullWidth
          multiline
          minRows={3}
          required
          onChange={handleChangeContent}
        />

        <div className='mt-3 d-flex justify-content-end'>
          <Button type='submit' variant='contained' sx={{}}>
            {parentCommentId ? 'Post reply' : 'Post comment'}
          </Button>
        </div>
      </form>
    </Box>
  )
}

export default CommentForm
