import React from 'react'
import FilmItem from './FilmItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const RelatedMovieSlider = ({ relatedMovies }) => {
  return (
    <div key={relatedMovies.id}>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className='mySwiper p-3'
      >
        {relatedMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            <FilmItem film={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RelatedMovieSlider
