import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import './BtnWatchlist.css'
import {
  addToWatchlist,
  removeFromWatchlist
} from '../redux/feature/watchlistSlice'

import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth'

const BtnWatchlist = ({ film, type }) => {
  const dispatch = useDispatch()

  const { userId } = useAuth()

  const stateWatchlist = useSelector(state => state.watchlist)

  const { watchlist, addInLoading } = stateWatchlist

  let loadBtn = false
  addInLoading.movieId === film._id ? (loadBtn = true) : (loadBtn = false)

  const onWatchlist = watchlist.find(item => item._id === film._id)

  const handleWatchlist = () => {
    dispatch(addToWatchlist({ movieId: film._id, userId, toast }))
  }

  const handleRemoveWatchlist = () => {
    dispatch(
      removeFromWatchlist({
        userId: userId,
        movieId: film._id,
        alias: film.alias,
        toast
      })
    )
  }

  if (type === 'watchlist') {
    return (
      <Button
        variant='outlined'
        className=''
        color='primary'
        disabled={loadBtn}
        onClick={handleRemoveWatchlist}
      >
        <CheckIcon className='me-2' fontSize='small' />
        {' watchlist'}
      </Button>
    )
  }

  return (
    <>
      {onWatchlist ? (
        <LoadingButton
          variant='contained'
          className=''
          color='primary'
          disabled={loadBtn}
          onClick={handleRemoveWatchlist}
        >
          <CheckIcon className='me-2' fontSize='small' />
          {' watchlist'}
        </LoadingButton>
      ) : (
        <LoadingButton
          variant='outlined'
          className=''
          color='primary'
          loading={loadBtn}
          loadingIndicator='Loading…'
          onClick={handleWatchlist}
        >
          <AddIcon className='me-2' fontSize='small' />
          {'Watchlist'}
        </LoadingButton>
      )}
    </>
  )
}

export default BtnWatchlist
