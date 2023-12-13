import React, { useContext } from 'react'
import { UserContext } from '../context/User';


export default function UserInfo() {
    const { userData,Loading } = useContext(UserContext);

    if(Loading){
        return (
            <p>...loading</p>
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
