import React, { useEffect } from 'react'
import { getMovieByGenre, getMovieByType } from '../redux/feature/movieSlice'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../hooks/useAuth'
import { getWatchlist } from '../redux/feature/watchlistSlice'
import { getRateMovie } from '../redux/feature/ratingSlice'
import FilmList from '../components/FilmList'
import { useParams } from 'react-router-dom'

const ListMovie = () => {
  const params = useParams()
  const type = params?.type
  const genre = params?.genre

  const stateMovie = useSelector(state => state.movie)
  const { movies, loading, currentPage, numberOfPages, error } = stateMovie
  const { userId } = useAuth()

  const dispatch = useDispatch()

  useEffect(() => {
    if (type) {
      dispatch(getMovieByType({ type, currentPage }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, currentPage])

  useEffect(() => {
    if (genre) {
      dispatch(getMovieByGenre({ genre, currentPage }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, currentPage])

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
  )
}

export default ListMovie
