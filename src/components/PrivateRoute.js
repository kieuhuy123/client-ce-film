import React from 'react'

import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingToRedirect from './LoadingToRedirect'

const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation()
  const { roles } = useAuth()
  let allow = true

  if (roles.length) {
    allow = roles.some(role => allowedRoles.includes(role))
  } else {
    allow = false
  }

  return allow ? children : <LoadingToRedirect />
}

export default PrivateRoute
