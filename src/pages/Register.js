import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { register } from '../redux/feature/authSlice'
import { useDispatch } from 'react-redux'

const initialState = {
  email: '',
  password: '',
  confirmPassword: ''
}

const Register = () => {
  const [formValue, setFormValue] = useState(initialState)
  console.log(formValue)
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
      console.log(formValue)
      dispatch(register({ formValue, navigate, toast }))
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
        <Form.Group className='mb-3' controlId='formBasicPasswordConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={onInputChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Register
