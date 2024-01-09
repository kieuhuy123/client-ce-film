import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Icon,
  styled
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { FaStar } from 'react-icons/fa'
import { FaRegStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  rateMovie,
  setOpen,
  updateRatingMovie
} from '../redux/feature/ratingSlice'
import useAuth from '../hooks/useAuth'

const RateDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiPaper-root': {
    backgroundColor: '#1f1f1f',
    minWidth: '600px',
    overflow: 'visible'
  }
}))

const RatingDialog = ({ film, open, handleClose }) => {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const { userId } = useAuth()

  const dispatch = useDispatch()

  const { rated } = useSelector(state => ({ ...state.rating }))

  const ratedMovie = rated ? rated.find(item => item.movieId === film._id) : ''

  const handleRate = () => {
    if (ratedMovie) {
      dispatch(
        updateRatingMovie({
          userId: userId,
          movieId: film._id,
          rateValue: rating,
          oldRateValue: ratedMovie.value
        })
      )

      dispatch(setOpen(false))
    } else {
      dispatch(
        rateMovie({ userId: userId, movieId: film._id, rateValue: rating })
      )

      dispatch(setOpen(false))
    }
  }
  useEffect(() => {
    if (ratedMovie) {
      setRating(ratedMovie.value)
    } else {
      setRating(null)
    }
  }, [ratedMovie])
  return (
    <RateDialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers className='d-flex flex-column align-items-center'>
        <div className='rating-center position-absolute d-flex flex-column align-items-center'>
          <FaStar
            className='icon-rating'
            size={96}
            color={'#5799ef'}
            style={{ transform: `scale(calc(1 + 0.05*${rating}))` }}
          />
          <span className='rating-text  text-white'>
            {rating ? rating : '?'}
          </span>
        </div>
        <span className='text-warning mt-5'>Rate this</span>
        <h2>{film?.title}</h2>

        <div className=''>
          <div className='mb-3'>
            {[...Array(10)].map((star, index) => {
              const currentRating = index + 1
              return (
                <label key={index}>
                  <input
                    type='radio'
                    name='rating'
                    className='d-none'
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                  />
                  {currentRating <= (hover || rating) ? (
                    <FaStar
                      className='icon-rating'
                      size={32}
                      color={'#5799ef'}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  ) : (
                    <FaRegStar
                      className='icon-rating'
                      size={32}
                      color={'#aaaaaa'}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  )}
                </label>
              )
            })}
          </div>
          <Button variant='contained' fullWidth onClick={handleRate}>
            {'Rating'}
          </Button>
        </div>
      </DialogContent>
    </RateDialog>
  )
}

export default RatingDialog
