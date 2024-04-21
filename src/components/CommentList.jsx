import { Avatar, Button, IconButton, Paper } from '@mui/material'
import React, { useMemo, useState } from 'react'
import CommentForm from './CommentForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteComment,
  getCommentsByParentId
} from '../redux/feature/commentSlice'
import { FiCornerDownRight } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { FaRegCommentAlt } from 'react-icons/fa'
import { LiaCommentSlashSolid } from 'react-icons/lia'

const Comment = ({
  comment,
  movieId,
  userId,
  userEmail,
  loadingBtn,
  commentListChild
}) => {
  const [replying, setReplying] = useState(false)
  const stateComment = useSelector(state => state.comment)
  const { childComments } = stateComment

  const {
    comment_content,
    comment_user_email,
    createdAt,
    comment_user_id,
    comment_left,
    comment_right,
    _id: commentId
  } = comment

  let width = comment_right - comment_left

  let disableBtn = loadingBtn.commentId === commentId ? true : false
  const dispatch = useDispatch()

  const handleReply = () => {
    setReplying(!replying)
  }

  const handleDelete = () => {
    dispatch(deleteComment({ commentId, movieId }))
    setReplying(false)
  }

  const handleGetComment = () => {
    dispatch(getCommentsByParentId({ movieId, parentCommentId: commentId }))
  }

  const commentsByParentId = useMemo(() => {
    const group = {}
    childComments.forEach(item => {
      group[item.comment_parent_id] ||= []
      group[item.comment_parent_id].push(item)
    })

    return group
  }, [childComments])

  function getReplies (parentId) {
    return commentsByParentId[parentId]
  }

  const childComment = getReplies(commentId)

  return (
    <Paper variant='outlined' sx={{ padding: '20px', marginTop: '30px' }}>
      <div className='d-flex flex-row'>
        <Avatar />
        <div className='info ms-3 gap-3 d-flex'>
          <span>{comment_user_email}</span>
          <span>{createdAt}</span>
        </div>
      </div>
      <div className='mt-3'>{comment_content}</div>

      <div className='d-flex justify-content-end'>
        {userId === comment_user_id ? (
          <IconButton
            className='me-3'
            variant='outlined'
            color='error'
            onClick={handleDelete}
            disabled={disableBtn}
          >
            <MdDelete />
          </IconButton>
        ) : (
          ''
        )}

        <IconButton variant='contained' onClick={handleReply}>
          {replying ? <LiaCommentSlashSolid size={28} /> : <FaRegCommentAlt />}
        </IconButton>
      </div>
      {width > 1 && !commentListChild ? (
        <div className=''>
          {childComments.length > 1 ? (
            ''
          ) : (
            <>
              <FiCornerDownRight />
              <Button
                variant='text'
                onClick={handleGetComment}
              >{`Xem tất cả`}</Button>
            </>
          )}
        </div>
      ) : (
        ''
      )}
      {replying && (
        <div className='mt-3'>
          <CommentForm
            movieId={movieId}
            userId={userId}
            userEmail={userEmail}
            parentCommentId={commentId}
          />
        </div>
      )}

      {childComment && childComment.length > 0 && (
        <CommentList
          comments={childComment}
          movieId={movieId}
          userId={userId}
          userEmail={userEmail}
          loadingBtn={loadingBtn}
          commentListChild={true}
        />
      )}
    </Paper>
  )
}

const CommentList = ({
  comments,
  movieId,
  userId,
  userEmail,
  loadingBtn,
  commentListChild = false
}) => {
  return (
    <>
      {comments.map((comment, index) => (
        <Comment
          // {...comment}
          key={index}
          comment={comment}
          movieId={movieId}
          userId={userId}
          userEmail={userEmail}
          loadingBtn={loadingBtn}
          commentListChild={commentListChild}
        />
      ))}
    </>
  )
}

export default CommentList
