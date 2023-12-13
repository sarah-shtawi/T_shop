import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import './Categories.css'
import { Link } from 'react-router-dom';
export default function Categories() {

  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
    return data;
  }
  const { data, isLoading } = useQuery('web_category', getCategories);
  if (isLoading) {
    return (
      <h2>..loading</h2>
    )
  }
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='swiper-custom-pagination'></div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={6.4}
            navigation
            loop={true}
            autoplay={{
              delay: 3000
            }}
            pagination={{
              clickable: true,
              el: '.swiper-custom-pagination'
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}>
            {data?.categories.length ? data?.categories.map((category) =>
              <SwiperSlide key={category._id}>
                <Link to={`/products/category/${category._id}`}>
                  <div className='category'>
                    <img src={category.image.secure_url} className='rounded-circle' />
                    <h2 className='fs-5'>{category.name}</h2>
                  </div>
                </Link>
              </SwiperSlide>
            ) : 'no category found'}
          </Swiper>
        </div>
      </div>
    </>
  )
}
