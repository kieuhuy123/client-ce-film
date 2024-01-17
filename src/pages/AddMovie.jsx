import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

import UploadWidget from '../components/UploadWidget'
import { MuiChipsInput } from 'mui-chips-input'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createMovie,
  getMovieByAlias,
  updateMovie
} from '../redux/feature/movieSlice'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { toSlug } from '../utils/toSlug'
import movieGenre from '../lib/movieGenre.json'
import movieType from '../lib/movieType.json'
import {
  InputLabel,
  FormControl,
  Select,
  Chip,
  SelectChangeEvent,
  OutlinedInput,
  Box,
  MenuItem,
  TextField
} from '@mui/material'

const initialState = {
  title: '',
  alias: '',
  type: '',
  rate: '',
  genre: [],
  image: '',
  trailer: '',
  video: '',
  review: '',
  info: {
    time: '',
    nation: '',
    publish: '',
    directors: [],
    actors: []
  }
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
const AddMovie = () => {
  const { movie, loading, error } = useSelector(state => ({
    ...state.movie
  }))

  const [movieData, setMovieData] = useState(initialState)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const alias = params.alias

  const [publicId, setPublicId] = useState('')

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dladhhg6i'
    }
  })

  const { title, rate, genre, image, type, trailer, video, review, info } =
    movieData

  const myImage = cld.image(image ? image : publicId)

  const onInputChange = e => {
    const { name, value } = e.target

    setMovieData({ ...movieData, [name]: value })
  }
  const onInfoChange = e => {
    const { name, value } = e.target
    setMovieData({
      ...movieData,

      info: {
        ...movieData.info,
        [name]: value
      }
    })
  }

  const handleAddActor = actor => {
    setMovieData({
      ...movieData,
      info: {
        ...movieData.info,
        actors: [...movieData.info.actors, actor]
      }
    })
  }

  const handleDeleteActor = deleteActor => {
    setMovieData({
      ...movieData,
      info: {
        actors: movieData.info.actors.filter(actor => actor !== deleteActor)
      }
    })
  }

  const handleAddDirector = director => {
    setMovieData({
      ...movieData,
      info: {
        ...movieData.info,
        directors: [...movieData.info.directors, director]
      }
    })
  }

  const handleDeleteDirector = deleteDirector => {
    setMovieData({
      ...movieData,
      info: {
        directors: movieData.info.directors.filter(
          director => director !== deleteDirector
        )
      }
    })
  }

  useEffect(() => {
    setMovieData({ ...movieData, image: publicId })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieData.image, publicId])

  useEffect(() => {
    if (movieData.title) {
      const alias = toSlug(movieData.title)
      setMovieData({ ...movieData, alias })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieData.title])

  useEffect(() => {
    if (Object.keys(movie).length) {
      setMovieData(movie)
    }
  }, [movie])

  // get movie edit
  useEffect(() => {
    if (alias) {
      dispatch(getMovieByAlias(alias))
    } else {
      setMovieData(initialState)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (alias) {
      dispatch(updateMovie({ movieData, navigate, toast }))
    } else {
      dispatch(createMovie({ movieData, navigate, toast }))
    }
  }

  if (loading) {
    return <div>...Loading</div>
  }

  return (
    <div className='bg-white p-5'>
      <Container>
        <form className='mt-3' onSubmit={handleSubmit}>
          <div className='mb-2 mb-lg-4 bg-white p-3 p-lg-4 rounded-3 shadow-sm'>
            <div className='row'>
              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <TextField
                    className='bg-white'
                    name='title'
                    label='Tên phim'
                    value={title}
                    onChange={onInputChange}
                  ></TextField>
                </FormControl>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <InputLabel id='demo-simple-select-label' className=''>
                    {'Đánh giá'}
                  </InputLabel>
                  <Select
                    value={rate}
                    name='rate'
                    label='Đánh giá'
                    onChange={onInputChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <InputLabel id='demo-simple-select-label' className=''>
                    {'Chọn loại phim'}
                  </InputLabel>
                  <Select
                    value={type}
                    name='type'
                    label='Chọn loại phim'
                    onChange={onInputChange}
                  >
                    {movieType.map((type, index) => (
                      <MenuItem key={index} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <InputLabel id='demo-simple-select-label' className=''>
                    {'Chọn thể loại'}
                  </InputLabel>
                  <Select
                    value={genre}
                    name='genre'
                    label='Chọn thể loại'
                    multiple
                    onChange={onInputChange}
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value, index) => (
                          <Chip key={index} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {movieGenre.map((genre, index) => (
                      <MenuItem key={index} value={genre.value}>
                        {genre.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <TextField
                    className='bg-white'
                    name='trailer'
                    label='Trailer'
                    value={trailer}
                    onChange={onInputChange}
                  ></TextField>
                </FormControl>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <TextField
                    className='bg-white'
                    name='video'
                    label='Video'
                    value={video}
                    onChange={onInputChange}
                  ></TextField>
                </FormControl>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <TextField
                    className='bg-white'
                    name='time'
                    type='number'
                    label='Thời lượng'
                    value={info?.time}
                    onChange={onInfoChange}
                  ></TextField>
                </FormControl>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <TextField
                    className='bg-white'
                    name='nation'
                    label='Quốc gia'
                    value={info?.nation}
                    onChange={onInfoChange}
                  ></TextField>
                </FormControl>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <MuiChipsInput
                    name='actors'
                    label='Diễn viên'
                    className='bg-white form-control'
                    variant='outlined'
                    placeholder='Enter Tag'
                    fullWidth
                    hideClearAll
                    value={info?.actors}
                    onAddChip={actor => handleAddActor(actor)}
                    onDeleteChip={(actor, index) =>
                      handleDeleteActor(actor, index)
                    }
                  />
                </FormControl>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <MuiChipsInput
                    name='directors'
                    label='Đạo diễn'
                    className='bg-white form-control'
                    variant='outlined'
                    placeholder='Enter Tag'
                    fullWidth
                    hideClearAll
                    value={info?.directors}
                    onAddChip={director => handleAddDirector(director)}
                    onDeleteChip={(director, index) =>
                      handleDeleteDirector(director, index)
                    }
                  />
                </FormControl>
              </div>

              <div className='col-12 col-lg-6 mb-3'>
                <InputLabel>{'Image'}</InputLabel>
                <div className=''>
                  <UploadWidget setPublicId={setPublicId} />
                </div>
                <div className='mt-3' style={{ width: '400px' }}>
                  <AdvancedImage
                    className=''
                    style={{ maxWidth: '100%' }}
                    cldImg={myImage}
                    plugins={[responsive(), placeholder()]}
                  />
                </div>
              </div>

              <div className='col-12 col-lg-6'>
                <FormControl fullWidth className='mb-3'>
                  <TextField
                    className='bg-white'
                    type='number'
                    name='publish'
                    label='Khởi chiếu'
                    value={info?.publish}
                    onChange={onInfoChange}
                  ></TextField>
                </FormControl>
              </div>

              <div className='col-12'>
                <FormControl fullWidth className='mb-3'>
                  <TextField
                    className='bg-white'
                    multiline
                    rows={4}
                    name='review'
                    label='Review'
                    value={review}
                    onChange={onInputChange}
                  ></TextField>
                </FormControl>
              </div>

              <div className='col-12'>
                <Button variant='primary' type='submit'>
                  {'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default AddMovie
