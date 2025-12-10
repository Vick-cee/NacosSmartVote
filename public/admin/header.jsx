import { TbSunMoon } from "react-icons/tb"; 
import React from 'react'
import { IoIosNotifications } from "react-icons/io"; 
import { BiSun } from "react-icons/bi"; 


const Header = ({theme, setTheme, section, setSection}) => {
    const handleTheme = () => {
        theme === 'dark' ? setTheme('light'): setTheme('dark')
    }
  document.body.classList = (theme)
  localStorage.setItem('theme',theme)

  return (
    <div className='headerCon'>
       <div id='headerText'> 
            Admin Dashboard 
       </div>
        <div className="headerRight">
            <button id="theme_btn" onClick={() => handleTheme()}> { theme === 'dark' ? <BiSun /> :  <TbSunMoon /> } </button>
        </div>
    </div>
  )
}

export default Header
