import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../redux/feature/authSlice'
import { useDispatch } from 'react-redux'
import { FormControl, TextField } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
const initialState = {
  email: '',
  password: '',
  confirmPassword: ''
}

const Register = () => {
  const lightTheme = createTheme({
    palette: {
      mode: 'light'
    }
  })
  const [formValue, setFormValue] = useState(initialState)

  const { email, password, confirmPassword } = formValue
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onInputChange = e => {
    let { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return toast.error('Password should match')
    }
    if (email && password) {
      dispatch(register({ formValue, navigate, toast }))
    }
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <div className='bg-white p-5'>
        <div className='container-sm'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8'>
              <div className='bg-white p-3 p-lg-4 rounded-3 shadow-sm'>
                <h2 className='text-black text-center mb-3'>
                  Create your account
                </h2>
                <form className='mt-3 ' onSubmit={handleSubmit}>
                  <div className='col-12'>
                    <FormControl fullWidth className='mb-3'>
                      <TextField
                        type='email'
                        name='email'
                        label='email'
                        variant='outlined'
                        className='bg-white'
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
                        onChange={onInputChange}
                      />
                    </FormControl>
                  </div>

                  <div className='col-12'>
                    <FormControl fullWidth className='mb-3'>
                      <TextField
                        type='password'
                        name='confirmPassword'
                        label='Confirm Password'
                        onChange={onInputChange}
                      />
                    </FormControl>
                  </div>

                  <Button variant='primary' type='submit'>
                    Submit
                  </Button>

                  <div className='mt-3'>
                    <span className='text-black'>{'Have an account?'}</span>

                    <Link to={'/login'}>{'Login now'}</Link>
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

export default Register
