import React from 'react'
import User from '../menu/user'
import AdminUser from '../menu/adminUser'
import Nav from './nav'
import '../dashboard/dashboard.css'

const Menu = ({section, setSection}) => {
  return (
        <div className='menu'>
            <AdminUser />
            <Nav section={section} setSection={setSection}/>
        </div>
        
  )
}

export default Menu
