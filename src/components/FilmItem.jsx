import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setMovieIsRating, setOpen } from '../redux/feature/ratingSlice'
import BtnWatchlist from './BtnWatchlist'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
import { IconButton } from '@mui/material'
import { FaRegStar } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'
import { quality } from '@cloudinary/url-gen/actions/delivery'
import { format } from '@cloudinary/url-gen/actions/delivery'
import { fill } from '@cloudinary/url-gen/actions/resize'

import { auto } from '@cloudinary/url-gen/qualifiers/quality'

import avgRate from '../utils/avgRate'
const defaultRate = 7

const FilmItem = memo(function ({ film, type }) {
  const dispatch = useDispatch()

  const rated = useSelector(state => state.rating.rated)

  const ratedMovie =
    rated.length > 0
      ? rated.find(item => item.rating_movie._id === film._id)
      : []

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dladhhg6i'
    }
  })

  const myImage = cld
    .image(film.image)
    .delivery(quality(auto()), format(auto()))
    .resize(fill().width(222).height(328))

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
            alt={film.title}
            // plugins={[lazyload(), placeholder({ mode: 'blur' })]}
          />
        </figure>

        <p className='sub-title'>{film.title}</p>
      </Link>

      <div className='item-number'>
        {film?.rating_count && film?.total_rating_value
          ? avgRate(film?.rating_count, film?.total_rating_value)
          : defaultRate}
      </div>

      <div className='mt-auto'>
        <IconButton className='text-white me-3' size='small'>
          <FaStar color='#f5c518' />
          <span className='ms-2 '>
            {film?.rating_count && film?.total_rating_value
              ? avgRate(film?.rating_count, film?.total_rating_value)
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
            {ratedMovie ? ratedMovie.rating_value : ''}
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
