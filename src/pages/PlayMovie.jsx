import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  ReplayControl,
  ForwardControl
} from 'video-react'
import { getMovie, getRelatedMovies } from '../redux/feature/movieSlice'

import RelatedMovieSlider from '../components/RelatedMovieSlider'

const PlayMovie = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const alias = params.alias

  const { movie, relatedMovies } = useSelector(state => ({
    ...state.movie
  }))

  useEffect(() => {
    if (alias) {
      dispatch(getMovie(alias))
    }
  }, [alias, dispatch])

  useEffect(() => {
    if (alias && movie?.genre) {
      dispatch(getRelatedMovies({ movieId: movie._id, genre: movie.genre }))
    }
  }, [alias, dispatch, movie?.genre, movie._id])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <Player
            playsInline
            poster={movie?.image}
            src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
          >
            <BigPlayButton position='center' />
            <LoadingSpinner />
            <ControlBar autoHide={false}>
              <ReplayControl seconds={10} order={2.2} />
              <ForwardControl seconds={10} order={3.2} />
            </ControlBar>
          </Player>
          <div className=''>
            <h2>{movie?.title}</h2>
          </div>
          <div className='comment mt-3'>
            <h3 className='text-white'>{'Bình luận về phim'}</h3>
          </div>

          <div className='related-movie'>
            <h2>{'Có thể bạn muốn xem'}</h2>
            <RelatedMovieSlider relatedMovies={relatedMovies} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayMovie
