import React, { useEffect } from 'react'
import { getMovieByGenre, getMovieByType } from '../redux/feature/movieSlice'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../hooks/useAuth'
import { getWatchlist } from '../redux/feature/watchlistSlice'
import { getRateMovie } from '../redux/feature/ratingSlice'
import FilmList from '../components/FilmList'
import { useParams, useSearchParams } from 'react-router-dom'
import { Pagination } from '@mui/material'
import { toLabelType } from '../utils/toLabelType'
import { toLabelGenre } from '../utils/toLabelGenre'

const ListMovie = () => {
  const { type, genre } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const stateMovie = useSelector(state => state.movie)
  const { movies, loading, currentPage, numberOfPages, error } = stateMovie
  const { userId } = useAuth()

  const getPage = searchParams.get('page') ? searchParams.get('page') : 1

  const dispatch = useDispatch()

  const handlePageChange = (e, value) => {
    setSearchParams(`page=${value}`)
  }

  useEffect(() => {
    if (getPage && type) {
      dispatch(getMovieByType({ type, getPage }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, getPage])

  useEffect(() => {
    if (getPage && genre) {
      dispatch(getMovieByGenre({ genre, getPage }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, getPage])

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
    <div className='container'>
      <div className='row'>
        <div className='col-12 '>
          <div className='section-title-wrapper'>
            {type ? (
              <h2 className='section-title'>{toLabelType(type)}</h2>
            ) : (
              <h2 className='section-title'>{toLabelGenre(genre)}</h2>
            )}
          </div>
          <div className='tabs'>
            <div className='tabs-content'>
              <FilmList film={movies} />
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
        </div>

        {/* <div className='col-12 col-xl-3 sidebar'>
          <div className='sidenav-block-title sub-title'>Phim bộ hot</div>

          <div className='div-block'></div>

          <div className='sidenav-block-title sub-title'>Phim lẻ hot</div>

          <div className='div-block'></div>
        </div> */}
      </div>
    </div>
  )
}

export default ListMovie
