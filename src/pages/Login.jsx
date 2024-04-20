import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
// import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import { googleLogin, login } from '../redux/feature/authSlice'
import { useDispatch } from 'react-redux'
import { Button, FormControl, TextField } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'

// import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  const lightTheme = createTheme({
    palette: {
      mode: 'light'
    }
  })

  const [formValue, setFormValue] = useState(initialState)
  const { email, password } = formValue
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onInputChange = e => {
    let { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }))
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async response => {
      try {
        const res = await axios({
          method: 'get',
          url: 'https://www.googleapis.com/oauth2/v3/userinfo',
          headers: {
            Authorization: `Bearer ${response.access_token}`
          }
        })

        if (res?.data?.email && res?.data?.sub)
          dispatch(
            googleLogin({
              email: res.data.email,
              googleId: res.data.sub,
              navigate,
              toast
            })
          )
      } catch (error) {
        toast.error(error.response.data.error)
        console.log(error)
      }
    }
  })

  return (
    <ThemeProvider theme={lightTheme}>
      <div className='bg-white p-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8'>
              <div className='p-3 p-lg-4 rounded-3 shadow-sm'>
                <form className='mt-3' onSubmit={handleSubmit}>
                  <h2 className='text-black text-center mb-3'>
                    Log in to your account
                  </h2>
                  <div className='col-12'>
                    <FormControl fullWidth className='mb-3'>
                      <TextField
                        type='email'
                        name='email'
                        label='Email address'
                        variant='outlined'
                        onChange={onInputChange}
                      />
                    </FormControl>
                  </div>
                  <div className='col-12'>
                    <FormControl fullWidth className='mb-3'>
                      <TextField
                        type='password'
                        name='password'
                        label='Password'
                        variant='outlined'
                        onChange={onInputChange}
                      />
                    </FormControl>
                  </div>
                  <Button variant='contained' type='submit'>
                    Submit
                  </Button>
                  <div className='mt-3'>
                    <span className='text-black'>
                      {"Don't have an account? "}
                    </span>

                    <Link to={'/register'}>{'Register'}</Link>
                  </div>
                  <div className='w-100 mt-3'>
                    {/* <GoogleLogin
                      onSuccess={credentialResponse => {
                        console.log(credentialResponse)
                        console.log(
                          'info',
                          jwtDecode(credentialResponse.credential)
                        )
                      }}
                      onError={() => {
                        console.log('Login Failed')
                      }}
                    /> */}
                    <Button
                      variant='outlined'
                      startIcon={<FcGoogle />}
                      onClick={() => loginWithGoogle()}
                    >
                      {'Sign in with Google '}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Login
