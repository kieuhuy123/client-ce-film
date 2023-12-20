import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../components/Footer'
import Header from '../components/Header'
import RatingDialog from '../components/RatingDialog'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from '../redux/feature/ratingSlice'

const Layout = () => {
  const dispatch = useDispatch()
  const { openDialog, movieIsRating } = useSelector(state => ({
    ...state.rating
  }))

  const handleCloseRate = () => {
    dispatch(setOpen(false))
  }

  return (
    <>
      <RatingDialog
        open={openDialog}
        handleClose={handleCloseRate}
        film={movieIsRating}
      ></RatingDialog>

      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default Layout
