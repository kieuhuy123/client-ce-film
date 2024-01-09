import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MainReview = () => {
  const dispatch = useDispatch()

  const { movie, loading } = useSelector(state => ({
    ...state.movie
  }))
  return (
    <div className=''>
      <div className='container'>
        <div className='review-wrapper '>
          <div className='text-white'>
            <h2 className='trailer-title'>
              {`Review tóm tắt phim ${movie?.title}`}
            </h2>
            <p>{movie?.review}</p>
          </div>
          <div className='trailer' id='trailer'>
            <h2 className='trailer-title'>Official trailer:</h2>
            <div
              className='position-relative'
              style={{ paddingTop: '56.20608899297424%' }}
            >
              <iframe
                className='position-absolute top-0 left-0 w-100 h-100'
                src={movie?.trailer}
                frameBorder='0'
                width='854'
                height='480'
                loading='lazy'
                title='YouTube embed'
                allow='autoplay; fullscreen'
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainReview
