import React, { Suspense, memo, useEffect } from 'react'
import { BsFillTagsFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toLabelGenre } from '../utils/toLabelGenre'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
import { Button, Icon, IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { deleteMovie } from '../redux/feature/movieSlice'
import BtnWatchlist from './BtnWatchlist'

const HeaderReview = ({ alias }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { movie } = useSelector(state => ({
    ...state.movie
  }))

  const { isAdmin } = useAuth()

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dladhhg6i'
    }
  })

  const myImage = cld.image(movie?.image)

  const handleDelete = e => {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteMovie({ alias, navigate, toast }))
      }
    })
  }

  function Loading () {
    return <h2>🌀 Loading...</h2>
  }
  return (
    <div
      className='background-page-header'
      // style={{
      //   backgroundImage: `url(${movie.image})`
      // }}
    >
      <div className='background-overlay'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-4'>
              <div className='header-thumnail-img'>
                <AdvancedImage
                  className='item-block-img h-100'
                  style={{ maxWidth: '100%' }}
                  cldImg={myImage}
                />
              </div>
            </div>
            <div className='col-12 col-md-6 header-info'>
              <h1 className='header-title'>{movie?.title}</h1>
              <div className='info-wrapper on-review-page'>
                <div className='info-block'>
                  <BsFillTagsFill className='info-block-icon' />
                  {movie?.genre?.map((genre, index) => (
                    <Link
                      key={index}
                      to={'/category/' + genre}
                      className='info-title-link me-2'
                    >
                      {toLabelGenre(genre)}
                    </Link>
                  ))}
                </div>
              </div>
              <div className='mt-3'>
                <a href='#trailer'>
                  <Button variant='contained' className='me-3' color='info'>
                    {'Trailer'}
                  </Button>
                </a>

                <Link to={`/play/${alias}`}>
                  <Button variant='contained' className='' color='error'>
                    {'Xem phim'}
                  </Button>
                </Link>

                {isAdmin && (
                  <Link to={`/editMovie/${alias}`}>
                    <Tooltip title='Edit movie' className='ms-3 bg-white'>
                      <IconButton color='primary' aria-label='Edit movie'>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                )}

                {isAdmin && (
                  <Tooltip title='Delete movie' className='ms-3 bg-white'>
                    <IconButton
                      color='error'
                      aria-label='delete movie'
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
              <div className='mt-3'>
                <BtnWatchlist film={movie} />
              </div>
              {/* <Suspense fallback={<Loading />}> */}
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
              {/* </Suspense> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderReview
