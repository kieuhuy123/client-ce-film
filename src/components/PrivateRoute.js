import React from 'react'

import useAuth from '../utils/useAuth'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation()
  const { roles } = useAuth()
  let allow = true

  if (roles.length) {
    allow = roles.some(role => allowedRoles.includes(role))
  }

  return allow ? (
    children
  ) : (
    <Navigate to='/login' state={{ form: location }} replace />
  )
}

export default PrivateRoute
