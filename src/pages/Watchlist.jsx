import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

import FilmList from '../components/FilmList'
// Css
import './Home.css'
import { getWatchlist } from '../redux/feature/watchlistSlice'
import useAuth from '../hooks/useAuth'
import { getRateMovie } from '../redux/feature/ratingSlice'
const Watchlist = () => {
  const { watchlist, loading } = useSelector(state => ({
    ...state.watchlist
  }))

  const { userId } = useAuth()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getWatchlist(userId))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Get rating
  useEffect(() => {
    if (userId) {
      dispatch(getRateMovie(userId))
    }
  }, [userId, dispatch])

  if (loading) return <h1>Loading...</h1>

  if (watchlist?.length === 0) return <h1>No movies</h1>
  return (
    // <h1>Hello</h1>
    <Container>
      <Row>
        <Col lg='12' xl='9'>
          <div className='section-title-wrapper'>
            <h2 className='section-title'>Watchlist</h2>
          </div>
          <div className='tabs'>
            <div className='tabs-content'>
              <FilmList film={watchlist} type='watchlist' />
            </div>
          </div>
        </Col>

        <Col xl='3' className='sidebar'></Col>
      </Row>
    </Container>
  )
}

export default Watchlist
