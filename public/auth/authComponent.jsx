import React from 'react'
import Login from './login'
import Signup from './signup'
import AdminLogin from './adminLogin'
import Pending from './pending'
import '../auth/login.css'
import { useState } from 'react'

const AuthComponent = () => {
    const [authSection, setAuthSection] = useState('login')
  return (
    <div className='body2'>
      <img id="ftImg" src="../views/IMG-20251206-WA0008.jpg" alt="" />

        <div className='btnCon'>
            <button onClick={() => setAuthSection('login')} style={{borderBottom: authSection === 'login'? 'solid 2px #008400' : null}}>Login</button>
            <button onClick={() => setAuthSection('signup')} style={{borderBottom: authSection === 'signup'? 'solid 2px #008400' : null}}>Signup</button>
        </div>

        <main>
            <div style={{display: authSection !== 'login'? 'none' : 'block'}}> <Login authSection={authSection} setAuthSection={setAuthSection} /> </div>
            <div style={{display: authSection !== 'signup'? 'none' : 'block'}}> <Signup authSection={authSection} setAuthSection={setAuthSection}/> </div>
            <div style={{display: authSection !== 'admin'? 'none' : 'block'}}> <AdminLogin authSection={authSection} setAuthSection={setAuthSection}/> </div>
            <div style={{display: authSection !== 'pending'? 'none' : 'block'}}> <Pending authSection={authSection} setAuthSection={setAuthSection}/> </div>
        </main>
      
    </div>
  )
}

export default AuthComponent
