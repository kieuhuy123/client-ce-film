import { Link } from 'react-router-dom'

import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, placeholder, lazyload } from '@cloudinary/react'

// import { FilmControl } from "./FilmControl";
const FilmItem = ({ film, type }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dladhhg6i'
    }
  })

  const myImage = cld.image(film.image)
  return (
    <div className='item-block position-relative'>
      <Link to={'/review/' + film.alias}>
        <AdvancedImage
          className='item-block-img h-100'
          style={{ maxWidth: '100%' }}
          cldImg={myImage}
          plugins={[lazyload(), placeholder({ mode: 'blur' })]}
        />
        <div className='item-number'>{film.rate}</div>
      </Link>
      {/* <FilmControl film={film} type={type} /> */}

      <Link to={'/review/' + film.alias} className='item-block-title sub-title'>
        {film.title}
      </Link>
    </div>
  )
}

export default FilmItem
