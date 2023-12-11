import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/navbar/Navbar'
import Footer from '../components/dashboard/footer/Footer'

export default function DashboardLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
