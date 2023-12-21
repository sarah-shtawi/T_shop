import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import Loader from '../../loading/Loader';


export default function UserInfo() {
    const { userData,Loading } = useContext(UserContext);

    if(Loading){
        return (
            <Loader/>
        )
    }
    return (
        <>
            <div>
                <img src={userData?.image.secure_url} className='' />
                <h2>{userData?.userName}</h2>
            </div>
        </>
    )
}
