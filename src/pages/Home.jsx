import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFeaturedMovie,
  getMovies,
  setCurrentPage
} from '../redux/feature/movieSlice'
import FilmList from '../components/FilmList'
import { useSearchParams } from 'react-router-dom'

// Css
import './Home.css'
import useAuth from '../hooks/useAuth'
import { getWatchlist } from '../redux/feature/watchlistSlice'
import TopBanner from '../components/TopBanner'
import { getRateMovie } from '../redux/feature/ratingSlice'
import Pagination from '@mui/material/Pagination'

const Home = () => {
  const dispatch = useDispatch()
  const { userId } = useAuth()

  const [searchParams, setSearchParams] = useSearchParams()

  const stateMovie = useSelector(state => state.movie)
  const { movies, featuredMovies, loading, currentPage, numberOfPages, error } =
    stateMovie

  const getPage = searchParams.get('page') ? searchParams.get('page') : 1

  const handlePageChange = (e, value) => {
    setSearchParams(`page=${value}`)
  }

  useEffect(() => {
    if (getPage) {
      dispatch(getMovies(getPage))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPage])

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

  useEffect(() => {
    dispatch(getFeaturedMovie())
  }, [])

  if (loading) return <h1>Loading...</h1>

  if (movies.length === 0) return <h1>No movies</h1>
  return (
    <>
      <div>
        <TopBanner movies={featuredMovies} />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-12 '>
            <div className='section-title-wrapper'>
              <h2 className='section-title'>Phim mới</h2>
            </div>
            <div className='tabs'>
              <div className='tabs-content'>
                <FilmList film={movies} />
              </div>
            </div>
            {numberOfPages > 1 ? (
              <div className='d-flex justify-content-center  mb-4'>
                <Pagination
                  color='primary'
                  count={numberOfPages}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            ) : (
              ''
            )}
          </div>

          {/* <div className='col-12 col-xl-3 sidebar'>
            <div className='sidenav-block-title sub-title'>Phim bộ hot</div>

            <div className='div-block'></div>

            <div className='sidenav-block-title sub-title'>Phim lẻ hot</div>

            <div className='div-block'></div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Home
