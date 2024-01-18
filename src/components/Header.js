import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { ImFilm } from 'react-icons/im'
import { MdAddToPhotos } from 'react-icons/md'
import { MdCreate } from 'react-icons/md'
import { LuLogOut } from 'react-icons/lu'

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
  Box,
  Grid
} from '@mui/material'
//
import './Navbar.css'
import useAuth from '../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/feature/authSlice'
import toast from 'react-hot-toast'
import movieType from '../lib/movieType.json'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import movieGenre from '../lib/movieGenre.json'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setClick] = useState(false)
  const { email } = useAuth()

  const closeMobile = () => setClick(!open)

  const [anchorEl, setAnchorEl] = useState(null)

  const openAnchor = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout({ navigate, toast }))
  }

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

        <ul className={open ? 'nav-menu active me-auto' : 'nav-menu me-auto'}>
          <li className='nav-item'>
            <NavLink to='/' onClick={closeMobile}>
              {'Phim mới'}
            </NavLink>
          </li>
          {movieType.map((type, index) => (
            <li className='nav-item' key={index}>
              <NavLink to={`type/${type.value}`} onClick={closeMobile}>
                {type.label}
              </NavLink>
            </li>
          ))}
          <li className='nav-item position-relative dropdown-genre'>
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
                {movieGenre.map(genre => (
                  <Grid item md={6}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <NavLink
                          to={`/genre/${genre.value}`}
                          className={'text-white'}
                        >
                          <ListItemText primary={genre.label} />
                        </NavLink>
                      </ListItemButton>
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </li>

          <li className='nav-item'>
            <Link to='search' onClick={closeMobile}>
              <span style={{ display: 'flex' }}>
                <BsSearch style={{ fontSize: '20px', marginRight: '5px' }} />{' '}
                {'Tìm kiếm'}
              </span>
            </Link>
          </li>
        </ul>

        <div className='d-flex position-relative'>
          <Button className='d-xl-none'>
            {open ? (
              <FaTimes color='white' fontSize={32} onClick={closeMobile} />
            ) : (
              <FaBars color='white' fontSize={32} onClick={closeMobile} />
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
              <>
                <MenuItem onClick={() => navigate('/addMovie')}>
                  <ListItemIcon>
                    <MdCreate style={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  {'Create movie'}
                </MenuItem>
                <MenuItem onClick={() => navigate('/Watchlist')}>
                  <ListItemIcon>
                    <MdAddToPhotos style={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  {'Watch list'}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LuLogOut style={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  {'Logout'}
                </MenuItem>
              </>
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
