import React from 'react'
import { FaUser } from "react-icons/fa"; 
import { useState } from 'react';


const User = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user'))|| [])

  
  return (
    <div>
      <div className='userCon' style={{marginTop:'2rem'}}>
            <span id='userIcon'> <FaUser /> </span>
            <div className='userDetails'>
              <span id='storeName' style={{fontSize:'18px', margin:'.5rem 0rem'}}>{user.email}</span>
              <span style={{fontSize:'14px', marginBottom:'7px'}}>{user.matric? 'Matric -' : ''} {user.matric}</span>
            </div>
        </div>
    </div>
  )
}

export default User
