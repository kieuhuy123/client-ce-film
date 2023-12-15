import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useAuth from '../utils/useAuth'
import { getMovie } from '../redux/feature/movieSlice'
import { getWatchlist } from '../redux/feature/watchlistSlice'

import HeaderReview from '../components/HeaderReview'
import MainReview from '../components/MainReview'

const ReviewMoview = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const alias = params?.alias

  const { email } = useAuth()

  const { loading } = useSelector(state => ({
    ...state.movie
  }))

  useEffect(() => {
    if (alias) {
      dispatch(getMovie(alias))
    }
  }, [alias, dispatch])

  // Get watchlist
  useEffect(() => {
    if (email) {
      dispatch(getWatchlist(email))
    }
  }, [dispatch, email])

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
