import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/feature/authSlice'
import { useDispatch } from 'react-redux'

const initialState = {
  email: '',
  password: ''
}

const Login = () => {
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
    <Container>
      <Form className='mt-3' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            onChange={onInputChange}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Password'
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Login
