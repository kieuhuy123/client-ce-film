import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { ImFilm } from 'react-icons/im'
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popover,
  Tooltip
} from '@mui/material'
//
import './Navbar.css'
import useAuth from '../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/feature/authSlice'
import toast from 'react-hot-toast'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setClick] = useState(false)
  const { email, exp } = useAuth()

  // if (exp && exp * 1000 < new Date().getTime()) {
  //   dispatch(logout({ navigate, toast }))
  // }

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

        <ul className={open ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='search' onClick={closeMobile}>
              <span style={{ display: 'flex' }}>
                <BsSearch style={{ fontSize: '20px', marginRight: '5px' }} />{' '}
                Tìm kiếm
              </span>
            </Link>
          </li>
          <li className='nav-item'>
            <NavLink to='/' onClick={closeMobile}>
              Phim mới
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='the-loai/phim-chieu-rap' onClick={closeMobile}>
              Phim chiếu rạp
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='the-loai/phim-hoat-hinh' onClick={closeMobile}>
              Phim hoạt hình
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='the-loai/phim-bo' onClick={closeMobile}>
              Phim bộ
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='watchlist' onClick={closeMobile}>
              Bộ sưu tập
            </NavLink>
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

          {email ? (
            <>
              <Tooltip title='profile'>
                <Avatar className='text-uppercase ' onClick={handleClick}>
                  {email?.substring(0, 1)}
                </Avatar>
              </Tooltip>

              <Popover
                open={openAnchor}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <Paper>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => navigate('/addMovie')}>
                        <ListItemText primary='Add movie' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => navigate('/Watchlist')}>
                        <ListItemText primary='Watchlist' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleLogout}>
                        <ListItemText primary='Log out' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Paper>
              </Popover>
            </>
          ) : (
            <>
              <Tooltip title='profile'>
                <Avatar
                  className='text-uppercase '
                  onClick={handleClick}
                ></Avatar>
              </Tooltip>
              <Popover
                open={openAnchor}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <Paper>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => navigate('/login')}>
                        <ListItemText primary='Login' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Paper>
              </Popover>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
