import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'

import { Toaster } from 'react-hot-toast'
import Register from './pages/Register'
import AddMovie from './pages/AddMovie'
import PrivateRoute from './components/PrivateRoute'
import Layout from './layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setToken } from './redux/feature/authSlice'
// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ReviewMoview from './pages/ReviewMoview'
import { ROLES } from './lib/roles'
import Watchlist from './pages/Watchlist'
import PlayMovie from './pages/PlayMovie'
import ListMovie from './pages/ListMovie'
import SearchPage from './pages/Search'
import UserRatings from './pages/UserRatings'

import Packages from './pages/Packages'
import PackagePlan from './pages/PackagePlan'

function App () {
  const dispatch = useDispatch()
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))

  useEffect(() => {
    if (accessToken) {
      dispatch(setToken(accessToken))
    }
  }, [dispatch, accessToken])

  return (
    <BrowserRouter>
      <div className='App'>
        <Toaster />
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />}></Route>

            <Route
              path='/login'
              element={
                accessToken ? (
                  <Navigate to='/' replace={true}></Navigate>
                ) : (
                  <Login />
                )
              }
            />

            <Route
              path='/register'
              element={
                accessToken ? (
                  <Navigate to='/' replace={true}></Navigate>
                ) : (
                  <Register />
                )
              }
            />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/review/:alias' element={<ReviewMoview />} />
            <Route path='/play/:alias' element={<PlayMovie />}></Route>
            <Route path='/type/:type' element={<ListMovie />}></Route>
            <Route path='/genre/:genre' element={<ListMovie />}></Route>
            <Route path='/packages' element={<Packages />}></Route>
            <Route
              path='/packages/plan/:type'
              element={<PackagePlan />}
            ></Route>
            <Route
              path='/addMovie'
              element={
                <PrivateRoute allowedRoles={[ROLES.Admin]}>
                  <AddMovie />
                </PrivateRoute>
              }
            />
            <Route
              path='/watchlist'
              element={
                <PrivateRoute allowedRoles={[ROLES.Admin, ROLES.User]}>
                  <Watchlist />
                </PrivateRoute>
              }
            />
            <Route
              path='/ratings'
              element={
                <PrivateRoute allowedRoles={[ROLES.Admin, ROLES.User]}>
                  <UserRatings />
                </PrivateRoute>
              }
            />
            <Route
              path='/editMovie/:alias'
              element={
                <PrivateRoute allowedRoles={[ROLES.Admin]}>
                  <AddMovie />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
