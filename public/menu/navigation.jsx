import { FaRegChartBar } from "react-icons/fa"; 
import { FiLogOut } from "react-icons/fi"; 
import React from 'react'
import { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs"; 
import { RiGuideFill } from "react-icons/ri"; 
import { FaUsers } from "react-icons/fa"; 
import { FaUser } from "react-icons/fa"; 
import { AiOutlineBarChart } from "react-icons/ai"; 
import axios from 'axios'


const Navigation = ({section, setSection}) => {

  const [loggingOut, setLoggingOut] = useState(false)
  const [message, setMessage] = useState('')


  // logout post request
  async function logoutPost() {
        try{
          setLoggingOut(true)
          const res = await axios.post('http://localhost:5000/api/user/logout',
            { },
          {
            withCredentials: true
          })

          
          
          setLoggingOut(false)  
          window.location.reload()
          
        
        }catch(err){

          setLoggingOut(false)
          setInterval(() => {
            setMessage('unable to log user out')
          },2000)

          setMessage('')

        }
  }

  // logout onclick conditional statement
  const logOut = () => {
      const confirms = confirm('confirm logout')

      if(confirms){

        logoutPost()
        
      }else{

        alert('cancelled')

      }
  }
    
  

  return (
        <div className="menuBtnCon">

          <span id="menuBtn" onClick={() => setSection('candidate')} style={section === 'candidate'? {color:'#008400'} : null }>
            <button style={section === 'candidate'? {color:'#008400'} : null }>
                <FaUsers />
            </button> 
            Candidates
          </span>

          <span id="menuBtn" onClick={() => setSection('poll')} style={section === 'poll'? {color:'#008400'} : null }>
            <button style={section === 'poll'? {color:'#008400'} : null }>
                <FaRegChartBar />
            </button> 
            Poll
          </span>

          <span id="menuBtn" onClick={() => setSection('profile')} style={section === 'profile'? {color:'#008400'} : null }>
            <button style={section === 'profile'? {color:'#008400'} : null }>
                <FaUser />
            </button> 
            Profile
          </span>


          <span id="menuBtn" className="logoutBtn" onClick={() => logoutPost()}>
            <button>
                <FiLogOut />
            </button> 
            {loggingOut? 'logging user out' : 'Logout'}
          </span>

          

        </div>
  )
}

export default Navigation
