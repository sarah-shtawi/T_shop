import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import './Profile.css'
export default function Profile() {
    const { userData } = useContext(UserContext);
    return (
        <>
            <div className='profile container'>
                <h1 className='text-center p-3 '>Your Profile</h1>
                <div className='d-flex mt-5 p-5 text-center m-auto   '>
                    <img src={userData?.image.secure_url} className='w-25 h-25' />
                    <div className='contact ms-5 h-50 p-3 '>
                        <h2>Name  :{userData?.userName}</h2>
                        <h2>Email :{userData?.email} </h2>
                        <h2>ID:{userData?._id} </h2>
                        <h2>role:{userData?.role} </h2>
                        <h2>status : {userData?.status}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
