import React, { useContext } from 'react'
import { UserContext } from '../context/User';

export default function UserContact() {
    const { userData,Loading } = useContext(UserContext);
    if(Loading){
        return (
            <p>...loading</p>
        )
    }
  return (
    <>
    <div>
        <h2>{userData.email}</h2>
        <h2>{userData.phoneNumber}</h2>
    </div>
    </>
  )
}
