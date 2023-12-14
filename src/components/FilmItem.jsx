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
    <div className='item-block position-relative'>
      <Link to={'/review/' + film.alias}>
        <figure className='position-relative'>
          <AdvancedImage
            className='w-100 h-100 object-fit-cover'
            style={{ maxWidth: '100%' }}
            cldImg={myImage}
            plugins={[lazyload(), placeholder({ mode: 'blur' })]}
          />
          {/* <div className='item-control'></div> */}
        </figure>
      </Link>

      <div className='item-number'>{film.rate}</div>

      <Link to={'/review/' + film.alias} className='item-block-title sub-title'>
        {film.title}
      </Link>
      <div className='mt-3'>
        <BtnWatchlist film={film} type={type} />
      </div>
    </div>
  )
})

export default FilmItem
