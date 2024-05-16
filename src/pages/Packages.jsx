import React, { useEffect } from 'react'
import './Package.css'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { BsXCircleFill } from 'react-icons/bs'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getPackage } from '../redux/feature/packageSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const checkFeaturePackage = packageType => {
  return (
    <>
      <div>
        <div className='package-item change-background'>
          <BsFillCheckCircleFill color='#ff6500' fontSize={28} />
        </div>
        <div className='package-item '>
          <BsFillCheckCircleFill color='#ff6500' fontSize={28} />
        </div>
        <div className='package-item change-background'>
          {packageType === 'standard' ? (
            <BsXCircleFill color='rgb(89 89 90)' fontSize={28} />
          ) : (
            <BsFillCheckCircleFill color='#ff6500' fontSize={28} />
          )}
        </div>
        <div className='package-item'>
          <BsFillCheckCircleFill color='#ff6500' fontSize={28} />
        </div>
      </div>
    </>
  )
}
const Packages = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const statePackage = useSelector(state => state.package)
  const { packages } = statePackage

  const handlePackage = (e, type) => {
    e.preventDefault()
    navigate(`/packages/plan/${type}`)
  }

  useEffect(() => {
    dispatch(getPackage(''))
  }, [])
  return (
    <>
      <div className='container-lg my-3'>
        <div className='row'>
          <div className='col-4 pe-0'>
            <div className='display-item'>
              <div className='package-item head h1'>Mua gói</div>
              <div className='package-item change-background'>
                {'Giá dịch vụ'}
              </div>
              <div className='package-item '>{'Số thiết bị xem đồng thời'}</div>
              <div className='package-item change-background'>
                {'Độc quyền phim, show Việt đỉnh nhất'}
              </div>

              <div className='package-item '>
                {'100.000+ giờ giải trí đặc sắc'}
              </div>
              <div className='package-item change-background'>
                {'Quyền xem sớm nội dung phát song song'}
              </div>
              <div className='package-item '>
                {'Không quảng cáo trong video'}
              </div>
            </div>
          </div>

          <div className='col-8 d-flex ps-0'>
            {packages.map((item, index) => (
              <div className='display-item' key={index}>
                <div
                  className={
                    item.package_type === 'standard'
                      ? 'package-item head h1 rounded text-capitalize bg-info bg-gradient'
                      : 'package-item head h1 rounded text-capitalize bg-danger bg-gradient'
                  }
                >
                  {item.package_type}
                </div>
                <div className='package-item change-background'>
                  <div className=''>
                    <h5 className='m-0'>{`${item.package_plan[0].plan_price}vnđ`}</h5>{' '}
                    <div>
                      <p className='m-0'>{'1 tháng'}</p>
                    </div>
                  </div>
                </div>
                <div className='package-item'>
                  <div>{item.package_type === 'standard' ? '3' : '5'}</div>
                </div>
                {/*  */}
                {checkFeaturePackage(item.package_type)}
                <div className='package-item'>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={e => handlePackage(e, item.package_type)}
                  >
                    {'Chọn gói'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Packages
