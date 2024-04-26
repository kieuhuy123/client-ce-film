import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { ImFilm } from 'react-icons/im'
import { MdAddToPhotos } from 'react-icons/md'
import { MdCreate } from 'react-icons/md'
import { LuLogOut } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa'
import {
  Avatar,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Grid,
  TextField,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
//
import './Navbar.css'
import useAuth from '../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { googleLogin, logout } from '../redux/feature/authSlice'
import toast from 'react-hot-toast'
import movieType from '../lib/movieType.json'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import movieGenre from '../lib/movieGenre.json'
import { IoIosSearch } from 'react-icons/io'
import { googleLogout, useGoogleOneTapLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [searchParams, setSearchParams] = useSearchParams()
  // const querySearch = searchParams.get('q')
  const [open, setOpen] = useState(false)

  const { email } = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)
  const [keyword, setKeyword] = useState('')
  const openAnchor = Boolean(anchorEl)

  const openMenuMobile = () => {
    setOpen(true)
    body.classList.add('overflow-hidden')
  }
  const closeMobile = () => {
    body.classList.remove('overflow-hidden')

    setOpen(false)
  }
  const body = document.querySelector('.App')

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    googleLogout()
    dispatch(logout({ navigate }))
  }
  const handleChangeKeyword = e => {
    setKeyword(e.target.value)
  }
  const handleSearch = e => {
    e.preventDefault()
    closeMobile()
    navigate(`/search/?q=${keyword}`)

    // dispatch(getMovieByKeyword(keyword))
  }

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse)
      const info = jwtDecode(credentialResponse.credential)
      console.log('info', info)
      if (info?.sub && info?.email) {
        dispatch(
          googleLogin({
            email: info.email,
            googleId: info.sub,
            navigate,
            toast
          })
        )
      }
    },
    onError: () => {
      console.log('Login Failed')
    },
    disabled: email ? true : false
  })

  // useEffect(() => {
  //   if ((body, open)) {
  //     body.classList.add('overflow-hidden')
  //   }
  //   if ((body, !open)) {
  //     body.classList.remove('overflow-hidden')
  //   }
  // }, [body, open])

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <Link to='/' className='logo'>
            <ImFilm className='main-color' />
            CE F<span className='main-color'>IL</span>M
          </Link>
        </Navbar.Brand>
        {/* <div className='menu-icon' onClick={closeMobile}>
            {click ? <FaTimes /> : <FaBars />}
          </div> */}

        <ul
          className={
            open
              ? 'nav-menu active me-auto overflow-scroll'
              : 'nav-menu me-auto'
          }
        >
          {/* <li className='nav-item'>
            <NavLink to='/' onClick={closeMobile}>
              {'Phim mới'}
            </NavLink>
          </li> */}
          {movieType.map((type, index) => (
            <li className='nav-item order-2' key={index}>
              <NavLink to={`type/${type.value}`} onClick={closeMobile}>
                {type.label}
              </NavLink>
            </li>
          ))}
          {open ? (
            <Accordion className='order-2'>
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls='panel3-content'
                id='panel3-header'
                sx={{
                  '& .MuiAccordionSummary-content': {
                    justifyContent: 'center',
                    fontWeight: '600;',
                    fontSize: '17px'
                  },
                  background: '#1c2237',
                  color: '#899ead'
                }}
              >
                {'Thể loại'}
              </AccordionSummary>
              <AccordionDetails sx={{ background: '#1c2237' }}>
                <List>
                  <Grid container spacing={2}>
                    {movieGenre.map((genre, index) => (
                      <Grid item xs={6} key={index}>
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() => {
                              closeMobile()
                              navigate(`/genre/${genre.value}`)
                            }}
                          >
                            <ListItemText primary={genre.label} />
                          </ListItemButton>
                        </ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </List>
              </AccordionDetails>
            </Accordion>
          ) : (
            <li className='nav-item position-relative dropdown-genre order-2'>
              <a href='/#' onClick={closeMobile}>
                {'Thể loại'}
                <KeyboardArrowDownIcon />
              </a>

              <List
                className='list-genre position-absolute'
                sx={{
                  minWidth: '250px',

                  background: '#1f1f1f',
                  borderRadius: '4px'
                }}
              >
                <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                  {movieGenre.map((genre, index) => (
                    <Grid item md={6} key={index}>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/genre/${genre.value}`)
                          }}
                        >
                          <ListItemText primary={genre.label} />
                        </ListItemButton>
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              </List>
            </li>
          )}

          <li
            className={open ? 'nav-item ps-3 order-1' : 'nav-item ps-3 order-2'}
          >
            {/* <a href='/#' onClick={closeMobile}> */}
            {/* <span style={{ display: 'flex' }}>
                <BsSearch style={{ fontSize: '20px', marginRight: '5px' }} />
                {'Tìm kiếm'}
              </span> */}
            <form onSubmit={handleSearch}>
              <FormControl className='d-flex justify-content-center align-items-center position-relative'>
                <TextField
                  name='keyword'
                  value={keyword}
                  onChange={handleChangeKeyword}
                  hiddenLabel
                  placeholder='Tìm kiếm'
                  variant='outlined'
                  sx={{ minWidth: '350px' }}
                />
                <IconButton
                  aria-label='delete'
                  className='position-absolute end-0'
                  onClick={handleSearch}
                >
                  <IoIosSearch fontSize={32} />
                </IconButton>
              </FormControl>
            </form>

            {/* </a> */}
          </li>
        </ul>

        <div className='d-flex position-relative'>
          <Button className='d-xl-none'>
            {open ? (
              <FaTimes color='white' fontSize={32} onClick={closeMobile} />
            ) : (
              <FaBars color='white' fontSize={32} onClick={openMenuMobile} />
            )}
          </Button>

          <Tooltip title='profile'>
            <IconButton
              onClick={handleClick}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              {email ? (
                <Avatar>{email?.substring(0, 1)}</Avatar>
              ) : (
                <Avatar></Avatar>
              )}
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={openAnchor}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                background: '#1f1f1f',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {email ? (
              <div>
                <MenuItem onClick={() => navigate('/addMovie')}>
                  <ListItemIcon>
                    <MdCreate style={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  {'Create movie'}
                </MenuItem>
                <MenuItem onClick={() => navigate('/watchlist')}>
                  <ListItemIcon>
                    <MdAddToPhotos style={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  {'Your Watchlist'}
                </MenuItem>
                <MenuItem onClick={() => navigate('/ratings')}>
                  <ListItemIcon>
                    <FaStar style={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  {'Your ratings'}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LuLogOut style={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  {'Logout'}
                </MenuItem>
              </div>
            ) : (
              <MenuItem onClick={() => navigate('/login')}>
                <ListItemIcon>
                  <LuLogOut style={{ fontSize: '20px' }} />
                </ListItemIcon>
                {'Login'}
              </MenuItem>
            )}
          </Menu>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
