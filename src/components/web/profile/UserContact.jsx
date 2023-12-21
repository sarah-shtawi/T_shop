import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import Loader from '../../loading/Loader';

export default function UserContact() {
    const { userData,Loading } = useContext(UserContext);
    if(Loading){
        return (
          <Loader/>
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
