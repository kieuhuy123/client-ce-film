import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(state => state.auth.token)

  let isAdmin = false
  let status = 'Employee'

  if (token) {
    const decoded = jwtDecode(token)
    console.log('decoded', decoded)
    const { email, roles } = decoded.UserInfo

    isAdmin = roles.includes(9999)

    if (isAdmin) status = 'Admin'

    return { email, roles, status, isAdmin }
  }

  return { email: '', roles: [], isAdmin, status }
}
export default useAuth
