import React, { useEffect } from 'react'
import { BsFillTagsFill } from 'react-icons/bs'
import { BiTimeFive } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getMovie } from '../redux/feature/movieSlice'
import { toLabelGenre } from '../utils/toLabelGenre'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, placeholder, lazyload } from '@cloudinary/react'
import Button from '@mui/material/Button'
import useAuth from '../utils/useAuth'

const ReviewMoview = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const alias = params?.alias
  const { movie, loading } = useSelector(state => ({
    ...state.movie
  }))

  const { isAdmin } = useAuth()
  console.log('isAdmin', isAdmin)
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dladhhg6i'
    }
  })

  const myImage = cld.image(movie.image)

  useEffect(() => {
    if (alias) {
      dispatch(getMovie(alias))
    }
  }, [])

  if (loading) {
    return <div>...Loading</div>
  }

  return (
    <>
      <div
        className='background-page-header'
        // style={{
        //   backgroundImage: `url(${movie.image})`
        // }}
      >
        <div className='background-overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-4'>
                <div className='header-thumnail-img'>
                  {/* <img src={movie.image} alt='' /> */}
                  <AdvancedImage
                    className='item-block-img h-100'
                    style={{ maxWidth: '100%' }}
                    cldImg={myImage}
                    plugins={[lazyload(), placeholder({ mode: 'blur' })]}
                  />
                </div>
              </div>
              <div className='col-4 header-info'>
                <h1 className='header-title'>{movie?.title}</h1>
                <div className='info-wrapper on-review-page'>
                  <div className='info-block'>
                    <BsFillTagsFill className='info-block-icon' />
                    {movie?.genre?.map(genre => (
                      <Link
                        to={'/category/' + genre}
                        className='info-title-link me-2'
                      >
                        {toLabelGenre(genre)}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className='mt-3'>
                  <Button variant='contained' className='me-3' color='info'>
                    {'Trailer'}
                  </Button>
                  <Button variant='contained' className='' color='error'>
                    {'Xem phim'}
                  </Button>
                  {isAdmin && (
                    <Link to={`/editMovie/${alias}`}>
                      <Button
                        variant='contained'
                        className='ms-3'
                        color='secondary'
                      >
                        {'Sửa phim'}
                      </Button>
                    </Link>
                  )}
                </div>

                <div className='header-short-description text-white mt-3'>
                  <p>
                    {'Thời lượng: ' + movie?.info?.time}
                    {/* <br /> */}
                    {/* {'Số tập: ' + movie.info.episode} */}
                    <br />
                    {'Năm xuất bản: ' + movie?.info?.publish}
                    <br />
                    {'Diễn viên: ' + movie?.info?.actors}
                    <br />
                    {'Đạo diễn: ' + movie?.info?.directors}
                    <br />
                    {'Quốc gia: ' + movie?.info?.nation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewMoview
