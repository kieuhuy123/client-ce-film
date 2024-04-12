import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ReactPlayer from 'react-player/lazy'

import { getMovieByAlias, getRelatedMovies } from '../redux/feature/movieSlice'

import RelatedMovieSlider from '../components/RelatedMovieSlider'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import { getComments } from '../redux/feature/commentSlice'
import useAuth from '../hooks/useAuth'
import { Skeleton } from '@mui/material'
// css
import './PlayMovie.css'

const PlayMovie = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const alias = params.alias

  const stateMovie = useSelector(state => state.movie)
  const { movie, relatedMovies } = stateMovie

  const stateComment = useSelector(state => state.comment)
  const { comments, loading, loadingBtn } = stateComment

  const { email, userId } = useAuth()
  useEffect(() => {
    if (alias) {
      dispatch(getMovieByAlias(alias))
    }
  }, [alias, dispatch])

  useEffect(() => {
    if (alias && movie?.genre) {
      dispatch(getRelatedMovies({ movieId: movie._id, genre: movie.genre }))
    }
  }, [alias, dispatch, movie?.genre, movie._id])

  useEffect(() => {
    if (movie?._id) {
      dispatch(
        getComments({
          movieId: movie._id
        })
      )
    }
  }, [movie])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <div className='position-relative player-wrapper'>
            <ReactPlayer
              className='position-absolute top-0 left-0 react-player'
              controls={true}
              url={'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'}
              width='100%'
              height='100%'
            />
          </div>

          <div className=''>
            <h2>{movie?.title}</h2>
          </div>
          <div className='comment mt-3'>
            <h3 className='text-white'>{'Bình luận về phim'}</h3>

            <CommentForm
              movieId={movie._id}
              userId={userId}
              userEmail={email}
              loading={loading}
            />

            {loading ? (
              Array(3)
                .fill(1)
                .map((item, index) => (
                  <div key={index}>
                    <Skeleton
                      className='mt-4'
                      variant='rectangular'
                      height={120}
                    />
                    <Skeleton />
                    <Skeleton width='60%' />
                  </div>
                ))
            ) : (
              <CommentList
                comments={comments}
                movieId={movie._id}
                userId={userId}
                userEmail={email}
                loadingBtn={loadingBtn}
              />
            )}
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
