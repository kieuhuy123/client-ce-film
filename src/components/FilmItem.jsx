import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setMovieIsRating, setOpen } from '../redux/feature/ratingSlice'
import BtnWatchlist from './BtnWatchlist'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, placeholder, lazyload } from '@cloudinary/react'
import { IconButton } from '@mui/material'
import { FaRegStar } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'

import avgRate from '../utils/avgRate'
const defaultRate = 7

const FilmItem = memo(function ({ film, type }) {
  const dispatch = useDispatch()

  const { rated } = useSelector(state => ({ ...state.rating }))
  const ratedMovie = rated.find(item => item.movieId === film._id)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dladhhg6i'
    }
  })

  const myImage = cld.image(film.image)

  const handleOpenRate = () => {
    dispatch(setOpen(true))
    dispatch(setMovieIsRating(film))
  }

  return (
    <div className='d-flex flex-column position-relative h-100'>
      <Link to={'/review/' + film.alias}>
        <figure className='item-media position-relative w-100 padding'>
          <AdvancedImage
            className='w-100 h-100 object-fit-cover position-absolute top-0 start-0 end-0 bottom-0'
            style={{ maxWidth: '100%' }}
            cldImg={myImage}
            plugins={[lazyload(), placeholder({ mode: 'blur' })]}
          />
        </figure>

        <p className='sub-title'>{film.title}</p>
      </Link>

      <div className='item-number'>
        {film?.rateCount && film?.rateValue
          ? avgRate(film?.rateCount, film?.rateValue)
          : defaultRate}
      </div>

      <div className='mt-auto'>
        <IconButton className='text-white me-3' size='small'>
          <FaStar color='#f5c518' />
          <span className='ms-2 '>
            {film?.rateCount && film?.rateValue
              ? avgRate(film?.rateCount, film?.rateValue)
              : defaultRate}
          </span>
        </IconButton>

        <IconButton
          aria-label='rate'
          color='primary'
          size='small'
          onClick={handleOpenRate}
        >
          <FaRegStar />
          <span className='ms-2 text-white'>
            {ratedMovie ? ratedMovie.value : ''}
          </span>
        </IconButton>
      </div>

      <div className='mt-3'>
        <BtnWatchlist film={film} type={type} />
      </div>
    </div>
  )
})

export default FilmItem
