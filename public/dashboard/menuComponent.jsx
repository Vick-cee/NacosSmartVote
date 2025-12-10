import React from 'react'
import User from '../menu/user';
import Navigation from '../menu/navigation';
//import { useState } from 'react';

const MenuComponent = ({section, setSection}) => {
  //const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user'))|| [])
  //<span style={{fontSize:'14px', color:'grey', textAlign:'center', marginTop:'20px'}}>{user.userId? 'UserId -' : ''} {user.userId}</span>


  return (
    <div className='menu'>
      <User />
      <Navigation section={section} setSection={setSection}/>
    </div>
  )
}

export default MenuComponent
