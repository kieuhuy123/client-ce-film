import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getMovieByAlias } from '../redux/feature/movieSlice'
import { getWatchlist } from '../redux/feature/watchlistSlice'

import HeaderReview from '../components/HeaderReview'
import MainReview from '../components/MainReview'

const ReviewMoview = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const alias = params?.alias

  const { userId } = useAuth()

  const { loading } = useSelector(state => ({
    ...state.movie
  }))

  useEffect(() => {
    if (alias) {
      dispatch(getMovieByAlias(alias))
    }
  }, [alias, dispatch])

  // Get watchlist
  useEffect(() => {
    if (userId) {
      dispatch(getWatchlist(userId))
    }
  }, [dispatch, userId])

  if (loading) {
    return <div>...Loading</div>
  }

  return (
    <>
      <HeaderReview alias={alias}></HeaderReview>
      <MainReview></MainReview>
    </>
  )
}

export default ReviewMoview
