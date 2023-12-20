import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../redux/feature/movieSlice'
import FilmList from '../components/FilmList'
// Css
import './Home.css'
import useAuth from '../utils/useAuth'
import { getWatchlist } from '../redux/feature/watchlistSlice'
import TopBanner from '../components/TopBanner'
import { getRateMovie, setOpen } from '../redux/feature/ratingSlice'
import RatingDialog from '../components/RatingDialog'

const Home = () => {
  const { movies, loading, currentPage, numberOfPages } = useSelector(
    state => ({
      ...state.movie
    })
  )

  const { userId } = useAuth()

  const dispatch = useDispatch()

  const handleCloseRate = () => {
    dispatch(setOpen(false))
  }

  useEffect(() => {
    dispatch(getMovies(currentPage))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Get watchlist
  useEffect(() => {
    if (userId) {
      dispatch(getWatchlist(userId))
    }
  }, [userId, dispatch])

  // Get rating
  useEffect(() => {
    if (userId) {
      dispatch(getRateMovie(userId))
    }
  }, [userId, dispatch])

  if (loading) return <h1>Loading...</h1>

  if (movies.length === 0) return <h1>No movies</h1>
  return (
    <>
      <TopBanner />
      <div className='container'>
        <div className='col'>
          <div className='col-12 col-xl-9'>
            <div className='section-title-wrapper'>
              <h2 className='section-title'>Phim mới</h2>
            </div>
            <div className='tabs'>
              <div className='tabs-content'>
                <FilmList film={movies} />
              </div>
            </div>
          </div>

          <div className='col-12 col-xl-3 sidebar'>
            <div className='sidenav-block-title sub-title'>Phim bộ hot</div>

            <div className='div-block'>
              {/* <NewFilmList film={currentPosts} /> */}
            </div>

            <div className='sidenav-block-title sub-title'>Phim lẻ hot</div>

            <div className='div-block'>
              {/* <NewFilmList film={currentPosts} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
