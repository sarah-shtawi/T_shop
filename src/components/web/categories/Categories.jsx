import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import './Categories.css'
import { Link } from 'react-router-dom';
import Loader from '../../loading/Loader';
export default function Categories() {
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    setLoading(true);
    const token = localStorage.getItem('userToken');
    const { data } = await axios.get(`https://ecommerce-node4.vercel.app/categories`,
      { headers: { Authorization: `Tariq__${token}` } });
    setLoading(false);
    return data;
  }
  const { data } = useQuery('web_category', getCategories);
  if (loading) {
    return (
      <Loader/>
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
                    <img src={category.image.secure_url} className='border-raduis w-100 h-100' />
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
