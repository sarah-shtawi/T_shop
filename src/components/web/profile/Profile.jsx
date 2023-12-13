import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import style from './Profile.module.css'
import { Link, Outlet } from 'react-router-dom';
export default function Profile() {
    const {  Loading } = useContext(UserContext);
    if (Loading) {
        return (
            <p>...loading</p>
        )
    }
    return (
        <>
            <aside className={`${style.profile}`}>
                <div className={`${style.profileLinks}`} >
                    <nav>
                        <Link to='' className='ms-4'>Information </Link>
                        <Link to='contact' className='ms-4'>Contact </Link>
                        <Link to='UserOrder' className='ms-4'>Order </Link>
                    </nav>
                </div>
                <div className={`${style.userData}`}>
                    <Outlet />
                </div>
            </aside>
        </>
    )
}
