import { FaUserGraduate } from "react-icons/fa"; 
import { IoMdMail } from "react-icons/io"; 
import { IoIosNotifications } from "react-icons/io"; 
import { TbSunMoon } from "react-icons/tb"; 
import React from 'react'
import { BiSun } from "react-icons/bi"; 
import { useContext } from 'react'
import NoticeContext from "../context/notiiceProvider";
const HeaderComponent = ({theme, setTheme, section, setSection}) => {

  let { voteHistory } = useContext(NoticeContext)
  voteHistory = voteHistory.filter((x) => x.seen !== true)
  

  const handleTheme = () => {
    theme === 'dark' ? setTheme('light'): setTheme('dark')

  }
  document.body.classList = (theme)
  localStorage.setItem('theme',theme)


  

  return (
    <div className='headerCon'>
       <div id='headerText'> 
          <FaUserGraduate />  Nacos-Smart Vote 
       </div>
        <div className="headerRight">
            <div className="bell" onClick={() => setSection('notification')}>
              <IoMdMail />
              { voteHistory.length === 0 ? '' : <span>{voteHistory.length}</span>}
            </div>
            <button id="theme_btn" onClick={() => handleTheme()}> { theme === 'dark' ? <BiSun /> :  <TbSunMoon /> } </button>
        </div>
    </div>
  )
}

export default HeaderComponent
