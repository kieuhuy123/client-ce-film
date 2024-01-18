import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
// import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../redux/feature/authSlice'
import { useDispatch } from 'react-redux'
import { Button, FormControl, TextField } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
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
