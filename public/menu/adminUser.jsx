import React from 'react'
import { FaUsers } from "react-icons/fa"; 



const AdminUser = () => {

  
  return (
    <div>
      <div className='userCon' style={{marginTop:'2rem'}}>
            <span id='userIcon'> <FaUsers /> </span>
            <div className='userDetails'>
              <span id='storeName'>Nasco-Smart vote</span>
              <span style={{fontSize:'14px', color:'grey'}}>Admin dashboard</span>
            </div>
        </div>
    </div>
  )
}

export default AdminUser
