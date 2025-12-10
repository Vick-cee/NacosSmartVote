import { BiChevronsRight } from "react-icons/bi"; 
import { BiChevronsLeft } from "react-icons/bi"; 
import { FaUserCircle } from "react-icons/fa"; 
import { RxTransparencyGrid } from "react-icons/rx"; 
import { TbSunMoon } from "react-icons/tb"; 
import { MdMobileFriendly } from "react-icons/md"; 
import { BsFillLightningFill } from "react-icons/bs"; 
import { FaUserGraduate } from "react-icons/fa"; 
import { FaUserFriends } from "react-icons/fa"; 
import { IoMdTimer } from "react-icons/io"; 
import { BsShieldCheck } from "react-icons/bs"; 
import { BiSun } from "react-icons/bi"; 

import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import './landingpage.css'



  

const Tutorial = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const [index, setIndex] = useState(0)

    const handleTheme = () => {
        theme === 'dark' ? setTheme('light'): setTheme('dark')
    }
    document.body.classList = (theme)
    localStorage.setItem('theme',theme)


    const gridAbout = [
        {
            id:1,
            image: '../views/landingpage.png',
            hoverTxt:'click on the user icon on your top rigth',
           
        },
        {
            id:2,
            image: '../views/signup.png',
            hoverTxt:'signup with your details',
            
        },
        {
            id:3,
            image: '../views/pending.png',
            hoverTxt:'you now wait to receive email of your verification statue',
           
        },
        {
            id:4,
            image: '../views/login.png',
            hoverTxt:'after being verified you login with your email and password',
           
        },
        {
            id:5,
            image: '../views/dashboard.png',
            hoverTxt:'now you can connect to internet and vote',
           
        },
    ]

    let tutLength = gridAbout.length

    const next = () => {

        let newIndex = index + 1

        if(!newIndex >= tutLength) return;

        else if(newIndex === tutLength) {   
            return setIndex(0)
        }

        else{
            setIndex(newIndex)
        }

        setIndex(newIndex)
        console.log(index);
        
    } 



    const prev = () => {

        if(index === 0) return setIndex(4)
        
            else{
                setIndex(index - 1)
            }

        console.log(index);
        
        
    } 


  return (
    <div>
        <div className='headerCon'>
            <div id='headerText'> 
                <FaUserGraduate/> Nacos-Smart Vote 
            </div>
            <div className="headerRight">
                <button id="theme_btn" onClick={() => handleTheme()}> { theme === 'dark' ? <BiSun /> :  <TbSunMoon /> } </button>
                <Link to={'/login/signup'}><button id="hlg"><FaUserCircle /></button></Link>
            </div>
        </div>

        <div className="overflowCon" style={{
            placeContent:'center'
        }}>

           

                
               
            {/* middle content and about */}
            <div className='aboutCon'>
                <p>{gridAbout[index].hoverTxt}</p>

                <div className='tutCon'>
                    <div className="tutBtn">
                        
                        <button onClick={prev}><BiChevronsLeft /> </button>
                        <button onClick={next}><BiChevronsRight /> </button>
                    </div>
                    <div class="tut">
                        <span id="stepTxt"> step {index + 1}</span>
                        <img id="tutImg" src={gridAbout[index].image} alt="" />                           
                    </div>

                    
                </div>
                
            </div>

                        
        

            

        


        </div>        

    </div>
  )
}

export default Tutorial

