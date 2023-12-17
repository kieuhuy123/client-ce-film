import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, placeholder, lazyload } from '@cloudinary/react'
import BtnWatchlist from './BtnWatchlist'

import { memo } from 'react'

const FilmItem = memo(function ({ film, type }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dladhhg6i'
    }
  })

  const myImage = cld.image(film.image)

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
          {/* <div className='item-control'></div> */}
        </figure>
        <p className='sub-title'>{film.title}</p>
      </Link>

      <div className='item-number'>{film.rate}</div>

      <div className='mt-auto'>
        <BtnWatchlist film={film} type={type} />
      </div>
    </div>
  )
})

export default FilmItem
