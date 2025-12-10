import { HiBadgeCheck } from "react-icons/hi"; 
import { BsPatchCheckFill } from "react-icons/bs"; 
import React from 'react'
import { useState } from "react";
import { FaUser } from 'react-icons/fa'


const Profile = ({section}) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user'))|| [])
  return (
    <div className={`section ${section === 'profile'? 'active_section' : ''}`} id='profile'>

      <div id="htext2" style={{padding:'1rem'}}> User Profile</div>
      <div className='proCon'>
        <div className='con1'>
          <div id='profileIcon'> <FaUser /> </div>
          <div>UserId - {user.userId}</div>
        </div>

        <div className='con2'>
          <span> <strong>username</strong> <span>{user.username}</span> </span>
          <span> <strong>email</strong> <span>{user.email}</span> </span>
          <span> <strong>matric</strong> <span>{user.matric}</span> </span>
          <span> <strong>course</strong> <span>{user.course}</span> </span>
          <span> <strong>status</strong> <span style={{color:'green'}}>verified <HiBadgeCheck /></span> </span>
        </div>
      </div>
    </div>
  )
}

export default Profile
