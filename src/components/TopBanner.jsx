import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import './TopBanner.css'
// import required modules
import { Navigation } from 'swiper/modules'

import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, lazyload } from '@cloudinary/react'
import { IconButton } from '@mui/material'
import { FaRegStar } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'
import { quality } from '@cloudinary/url-gen/actions/delivery'
import { format } from '@cloudinary/url-gen/actions/delivery'
import { fill } from '@cloudinary/url-gen/actions/resize'

import { auto } from '@cloudinary/url-gen/qualifiers/quality'

import { FaPlay } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import avgRate from '../utils/avgRate'

const defaultRate = 7

const TopBanner = ({ movies }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dladhhg6i'
    }
  })

  return (
    <>
      <Swiper
        slidesPerView={1}
        // spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className='mySwiper top-banner'
      >
        {movies.map((item, index) => {
          const myImage = cld
            .image(item.featured_image)
            .delivery(quality(auto()), format(auto()))
          // .resize(fill().width(222).height(328))
          return (
            <SwiperSlide key={index}>
              <div className='position-relative overflow-hidden top-banner-item'>
                <AdvancedImage
                  className='w-100 h-100 object-fit-cover position-absolute top-0 start-0 end-0 bottom-0'
                  style={{ maxWidth: '100%' }}
                  cldImg={myImage}
                  alt={item.title}
                />
                <div className='overlay'></div>
                <div className='top-banner-content'>
                  <h2 className='top-down'>{item.title}</h2>
                  <div className='d-flex align-items-center gap-3 top-down delay-2'>
                    <div className=''>
                      <AiFillStar color='#c0392b' />
                      <span>
                        {item?.rating_count && item?.total_rating_value
                          ? avgRate(
                              item?.rating_count,
                              item?.total_rating_value
                            )
                          : defaultRate}
                      </span>
                    </div>
                    <div className=''>
                      <BiTimeFive color='#c0392b' />
                      <span className='ps-1'>{`${item?.info?.time} phút`}</span>
                    </div>
                  </div>
                  <div className='top-down delay-4'>
                    {item.review ||
                      '  Tác phẩm kể về Monkey D. Luffy, một chàng trai trẻ tuổi được thần tượng thủa thơ ấu là Shanks tóc đỏ truyền cảm hứng để trở thành một hải tặc thực thụ, bắt đầu ra khởi tại East Blue để tìm kho báu gianh giá và trở thành Vua hải tặc.'}
                  </div>
                  <div className='mt-3 top-down delay-6'>
                    <Link to={`/play/${item.alias}`} className='item-btn'>
                      <FaPlay className='z-1' />
                      <span className='z-1 ps-3'>Xem ngay</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}

        {/* <SwiperSlide>Slide 2</SwiperSlide> */}
      </Swiper>
    </>
  )
}

export default TopBanner
