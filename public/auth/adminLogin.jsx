import { BiLoader } from "react-icons/bi"; 
import React from 'react'
import { useState } from 'react'
import './login.css'
import axios from 'axios'
import { FaLessThanEqual } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({authSection, setAuthSection}) => {
    const navigate = useNavigate()

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    document.body.classList.add(theme)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [load, setLoad] = useState(false)
    
    const handleSubmit = async () => {
       if(!email || password.length < 6) return setMessage('email or password field is not valid') 
       setLoad(true)

        

       try {
          const res = await axios.post('/api/admin/login',
            {
              email, password

            })      

            setLoad(false);
            setMessage('Admin login successful')
            setTimeout(() => {
              navigate('/admin')
            },2000)

              
       } catch (error) {
        
        console.log(error);
        setLoad(false);
        setMessage('failed something went wrong')

        
        
       }

    }

    
  return (
    <div className='body1'>
      
      <div id='loginCon'>
       
        <p></p>
        <span id='header'>Admin</span>



        <span id='inputs'>
          <label htmlFor="email">email</label>
          <input 
              type="email" 
              placeholder='@gmail'
              className='email'
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
        </span>


        <span id='inputs'>
          <label htmlFor="password">password</label>
          <input 
              type="password" 
              placeholder='password'
              required={true}
              className='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
        </span>

        <button onClick={() => handleSubmit()}>Login</button>

        <div style={{textAlign:'center', margin:'0rem'}}>
          {
            load? <div id='loadAni'><BiLoader /></div> : 
            <div style={{color: message === 'Admin login successful'? 'green' : 'red', textAlign:'center', margin:'1rem'}}>{message}</div>
          }
        </div>
        
      </div>

       
        
        
        
    </div>
  )
}

export default AdminLogin
