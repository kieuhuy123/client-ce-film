import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { getMovies } from '../redux/feature/movieSlice'
import FilmList from '../components/FilmList'
// Css
import './Home.css'
const Home = () => {
  const { movies, loading, currentPage, numberOfPages } = useSelector(
    state => ({
      ...state.movie
    })
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMovies(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <h1>Loading...</h1>
  if (movies.length === 0) return <h1>No movies</h1>
  return (
    <Container>
      <Row>
        <Col lg='12' xl='9'>
          <div className='section-title-wrapper'>
            <h2 className='section-title'>Phim mới</h2>
          </div>
          <div className='tabs'>
            <div className='tabs-content'>
              <FilmList film={movies} />
            </div>
          </div>
        </Col>

        <Col xl='3' className='sidebar'>
          <div className='sidenav-block-title sub-title'>Phim bộ hot</div>

          <div className='div-block'>
            {/* <NewFilmList film={currentPosts} /> */}
          </div>

          <div className='sidenav-block-title sub-title'>Phim lẻ hot</div>

          <div className='div-block'>
            {/* <NewFilmList film={currentPosts} /> */}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
