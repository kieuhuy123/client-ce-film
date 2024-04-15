import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

import FilmList from '../components/FilmList'
// Css
import './Home.css'
import { getWatchlist } from '../redux/feature/watchlistSlice'
import useAuth from '../hooks/useAuth'
import { getRateMovie } from '../redux/feature/ratingSlice'
const UserRatings = () => {
  const stateRating = useSelector(state => state.rating)
  const { rated, loading } = stateRating

  const { userId } = useAuth()

  const films = []
  rated.map(item => films.push(item.rating_movie))

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

  if (rated?.length === 0) return <h1>No movies</h1>
  return (
    // <h1>Hello</h1>
    <Container>
      <Row>
        <Col lg='12'>
          <div className='section-title-wrapper'>
            <h2 className='section-title'>{'Your Ratings'}</h2>
          </div>
          <div className='tabs'>
            <div className='tabs-content'>
              <FilmList film={films} />
            </div>
          </div>
        </Col>

        {/* <Col xl='3' className='sidebar'></Col> */}
      </Row>
    </Container>
  )
}

export default UserRatings
