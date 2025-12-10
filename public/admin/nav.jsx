import { GrLineChart } from "react-icons/gr"; 
import React from 'react'
import { GiChart } from "react-icons/gi"; 
import { FaUsers } from "react-icons/fa"; 
import { AiOutlineBarChart } from "react-icons/ai"; 
import { FiLogOut } from "react-icons/fi"; 
import { useState } from 'react'
import axios from 'axios'


const Nav = ({section, setSection}) => {

  const [loggingOut, setLoggingOut] = useState(false)
  const [message, setMessage] = useState('')


  // logout post request
  async function logoutPost() {
        try{
          setLoggingOut(true)
          const res = await axios.post('http://localhost:5000/api/admin/logout',
          { },
          {
            withCredentials: true
          })

         
          setLoggingOut(false)  
          window.location.reload()
        
        }catch(err){

          setLoggingOut(false)
          setInterval(() => {
            setMessage('unable to log admin out')
          },2000)

          setMessage('')

        }
  }

  






  return (
    <div className="menuBtnCon">
        <span id="menuBtn" onClick={() => setSection('overview')} style={section === 'overview'? {color:'#008400'} : null }>
          <button style={section === 'overview'? {color:'#008400'} : null }>
              <GrLineChart />
          </button> 
          Overview
        </span>

        <span id="menuBtn" onClick={() => setSection('election')} style={section === 'election'? {color:'#008400'} : null }>
          <button style={section === 'election'? {color:'#008400'} : null }>
              <AiOutlineBarChart />
          </button> 
          Election
        </span>

        <span id="menuBtn" onClick={() => setSection('candidate')} style={section === 'candidate'? {color:'#008400'} : null }>
          <button style={section === 'candidate'? {color:'#008400'} : null }>
              <FaUsers />
          </button> 
          Candidates  
        </span>

        <span id="menuBtn" className="logoutBtn" onClick={() => logoutPost()}>
            <button>
              <FiLogOut />
            </button> 
            {loggingOut? 'logging admin out...' : 'Logout'}
        </span>

    </div>
  )
}

export default Nav