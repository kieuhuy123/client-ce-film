import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../components/Footer'
import Header from '../components/Header'
import RatingDialog from '../components/RatingDialog'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from '../redux/feature/ratingSlice'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const Layout = () => {
  const dispatch = useDispatch()
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const ratingState = useSelector(state => state.rating)

  const { openDialog, movieIsRating } = ratingState

  const handleCloseRate = () => {
    dispatch(setOpen(false))
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <RatingDialog
          open={openDialog}
          handleClose={handleCloseRate}
          film={movieIsRating}
        ></RatingDialog>

        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </ThemeProvider>
    </>
  )
}

export default Layout
