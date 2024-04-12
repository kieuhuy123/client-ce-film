import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieByKeyword } from '../redux/feature/movieSlice'
import FilmList from '../components/FilmList'
import { useNavigate, useSearchParams } from 'react-router-dom'

// Css
import './Home.css'
import useAuth from '../hooks/useAuth'
import { getWatchlist } from '../redux/feature/watchlistSlice'
import { getRateMovie } from '../redux/feature/ratingSlice'

const SearchPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userId } = useAuth()

  const [searchParams, setSearchParams] = useSearchParams()

  const querySearch = searchParams.get('q')
  const stateMovie = useSelector(state => state.movie)

  const { movies, loading, error } = stateMovie

  useEffect(() => {
    if (querySearch === '') navigate('/')

    if (querySearch) {
      dispatch(getMovieByKeyword(querySearch))
    }
  }, [querySearch, dispatch, navigate])
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

  if (movies.length === 0)
    return (
      <>
        <h2 className='section-title'>{`Tìm kiếm "${querySearch}"`}</h2>
        <h2 className='mt-3'>No movies</h2>
      </>
    )
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12 '>
            <div className='section-title-wrapper'>
              <h2 className='section-title'>{`Tìm kiếm "${querySearch}"`}</h2>
            </div>
            <div className='tabs'>
              <div className='tabs-content'>
                <FilmList film={movies} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchPage
