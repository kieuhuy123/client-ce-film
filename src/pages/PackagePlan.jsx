import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Radio
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPackage } from '../redux/feature/packageSlice'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'
import { PaymentIntents, orderNew } from '../redux/api'
import { loadStripe } from '@stripe/stripe-js'
import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js'

import axios from 'axios'

const PackagePlan = () => {
  const [choosePlan, setChoosePlan] = useState('')
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  const statePackage = useSelector(state => state.package)
  const { packages } = statePackage

  let { type: planType } = useParams()
  const { userId, email } = useAuth()

  const packagePlan =
    packages.length > 0
      ? packages.find(item => item.package_type === planType).package_plan
      : ''

  const handleChoose = (e, plan) => {
    e.preventDefault()
    setChoosePlan(plan)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const stripePromise = loadStripe(
    'pk_test_51O85IeBu0QGWOBrhwfSbAgNF1kDOR2Yy4KFDNExEpscF4El8w4Vs4e1KFiJW8mwkap1kFRqaSyGUzEy6Fz83dpja00E5Km4L7e'
  )

  const handlePayment = async () => {
    setOpen(true)
  }
  const handleOrder = async e => {
    e.preventDefault()
    if (!choosePlan) {
      toast.error('Có lỗi khi chọn gói')
    }

    try {
      const response = await orderNew({
        userId,
        package_order_new: {
          package_plan_id: choosePlan._id,
          package_discount: {}
        }
      })

      toast.success('Order thanh cong')
    } catch (error) {
      toast.error('Order that bai')
    }
  }
  useEffect(() => {
    if (packages && packages.length === 0) {
      dispatch(getPackage(''))
    }
  }, [packages, dispatch])

  useEffect(() => {
    setChoosePlan(packagePlan[0])
  }, [packagePlan])

  return (
    <>
      <div className='container-lg my-3'>
        <div className='h1'>{'Thanh toán'}</div>
        <div className='row mt-3'>
          <div className='col-lg-7 col-12'>
            <div className='h4'>{'Chọn thời hạn gói'}</div>
            {packagePlan
              ? packagePlan.map((plan, index) => (
                  <div key={index}>
                    <div
                      className='plan-select d-flex justify-content-between align-items-center position-relative fw-bold rounded p-3 mb-3'
                      onClick={e => handleChoose(e, plan)}
                    >
                      <div className='plan-radio position-absolute start-0'>
                        <Radio
                          checked={plan?.plan_name === choosePlan?.plan_name}
                          onChange={handleChoose}
                          color='error'
                        ></Radio>
                      </div>
                      <div className='plan-name ps-5'>{plan?.plan_name}</div>

                      <div className='plan-price'>
                        {`${plan?.plan_price?.toLocaleString('vi')} VND`}
                      </div>
                    </div>
                  </div>
                ))
              : ''}
          </div>
          <div className='col-lg-5 col-12'>
            <div className='payment-section p-4 rounded'>
              <div className='h4'>{'Thông tin thanh toán'}</div>
              <div className='payment-list d-flex justify-content-between'>
                <div className=''>
                  <span>{'Tài khoản'}</span>
                </div>
                <div className='fw-bold'>
                  <span>{email}</span>
                </div>
              </div>
              <Divider
                component='li'
                variant='middle'
                className='my-3'
              ></Divider>
              <div className='payment-list d-flex justify-content-between pb-3'>
                <div className=''>
                  <span>{'Tên gói'}</span>
                </div>
                <div className='fw-bold'>
                  <span>{`Gói `}</span>
                  <span className='text-uppercase'>
                    {choosePlan?.plan_type}
                  </span>
                </div>
              </div>
              <div className='payment-list d-flex justify-content-between'>
                <div className=''>
                  <span>{'Thời hạn gói'}</span>
                </div>
                <div className='fw-bold'>
                  <span>{choosePlan?.plan_name}</span>
                </div>
              </div>

              <Divider
                component='li'
                variant='middle'
                className='my-3'
              ></Divider>

              <div className='payment-list d-flex justify-content-between pb-3'>
                <div className=''>
                  <span>{'Giá gói'}</span>
                </div>
                <div className='fw-bold'>
                  {choosePlan?.plan_price ? (
                    <span>{`${choosePlan?.plan_price?.toLocaleString(
                      'vi'
                    )} VND`}</span>
                  ) : (
                    <span>{` 0 VND`}</span>
                  )}
                </div>
              </div>
              <div className='payment-list d-flex justify-content-between'>
                <div className=''>
                  <span>{'Giảm giá'}</span>
                </div>
                <div className='fw-bold'>
                  <span>{'0VND'}</span>
                </div>
              </div>

              <Divider
                component='li'
                variant='middle'
                className='my-3'
              ></Divider>
              <div className='payment-list d-flex justify-content-between py-3'>
                <div className=''>
                  <span>{'Tổng thanh toán'}</span>
                </div>
                <div className='payment-total fw-bold h3'>
                  {choosePlan?.plan_price ? (
                    <span>{`${choosePlan?.plan_price?.toLocaleString(
                      'vi'
                    )} VND`}</span>
                  ) : (
                    <span>{` 0 VND`}</span>
                  )}
                </div>
              </div>
              <Button
                variant='contained'
                color='error'
                fullWidth
                onClick={handlePayment}
              >
                {'Thanh toán'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <FormCheckOut
          userId={userId}
          open={open}
          handleClose={handleClose}
          choosePlan={choosePlan}
        />
      </Elements>
    </>
  )
}

const FormCheckOut = ({ userId, open, handleClose, choosePlan }) => {
  const elements = useElements()
  const stripe = useStripe()
  const negative = useNavigate()

  const handlePayment = async () => {
    const response = await PaymentIntents(choosePlan)

    const clientSecret = response.data.metadata

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if (paymentMethodReq.error) {
      toast.error(paymentMethodReq.error.message)
      return
    }

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id
    })

    if (error) {
      toast.error(error.message)
      return
    }

    await handleOrder({ userId, choosePlan })

    toast.success('Thanh toán thành công')

    negative('/')
  }

  const handleOrder = async ({ userId, choosePlan }) => {
    try {
      const response = await orderNew({
        userId,
        package_order_new: {
          package_plan_id: choosePlan._id,
          package_discount: {}
        }
      })
    } catch (error) {
      toast.error('Nâng cấp gói thất bại')
    }
  }

  const iframeStyles = {
    base: {
      color: '#fff',
      fontSize: '16px',
      iconColor: '#fff',
      '::placeholder': {
        color: '#87bbfd'
      }
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE'
    },
    complete: {
      iconColor: '#cbf4c9'
    }
  }

  const cardElementOpts = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        minWidth={500}
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle id='alert-dialog-title'>
          {'Thanh toán thẻ tín dụng'}
          <img
            src='https://fptplay.vn/images/payments/foxpay_credit/credit-providers.png'
            alt=''
            class='providers-icon'
          />
        </DialogTitle>
        <DialogContent sx={{ padding: 5 }}>
          <CardElement options={cardElementOpts} />
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant='contained'
            color='error'
            onClick={handlePayment}
          >
            {'Thanh toán'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PackagePlan
