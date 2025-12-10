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



  

const Landingpage = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    const handleTheme = () => {
        theme === 'dark' ? setTheme('light'): setTheme('dark')
    }
    document.body.classList = (theme)
    localStorage.setItem('theme',theme)

    const now = new Date()

    const gridAbout = [
        {
            id:1,
            why: 'Secure and transparent',
            hoverTxt:'Secure and privacy guranteed',
            hoverIcon:<RxTransparencyGrid />,
            icon: <BsShieldCheck />
        },
        {
            id:2,
            why: 'User friendly',
            hoverTxt:'Enjoy seemless interface',
            hoverIcon:<MdMobileFriendly />,
            icon: <FaUserFriends />
        },
        {
            id:3,
            why: 'Real time results',
            hoverTxt:'Enjoy lightening fast results in real time',
            hoverIcon:<BsFillLightningFill />,
            icon: <IoMdTimer />
        },
    ]
  return (
    <div>
        <div id="headerCon">
            <div id='headerText2'> 
                <FaUserGraduate/> Nacos-Smart voting 
            </div>
            <div className="headerRight">
                <button id="theme_btn" onClick={() => handleTheme()}> { theme === 'dark' ? <BiSun /> :  <TbSunMoon /> } </button>
                <Link to={'/login/signup'}><button id="hlg"><FaUserCircle /></button></Link>
            </div>
        </div>

        <div className="overflowCon">

            {/* first content */}
            <div className='firstFlex'>

            <div className='text'>
                <p id="nv">Nacos voting</p>

                <div id="h1">
                    Your Voice, Your Vote, Your Future
                </div>
                
                {/* intro text */}
                <p>
                   WELCOME TO NACOS-SMART VOTE a secure web-based application design to simplify and digitize the election
                   process for the National Association of Computong Student (NACOS) Kaduna State University (KASU CHAPTER).
                   Join hundreds of students and make your voice heard with just a click of a button. Your Voice, your vote,
                    your future! Signup to get started. Happy voting.
                </p>

                {/* action buttons */}
                <div id="actBtnCon">
                    <Link to={'/tutorial'}> <button id="gs"> Get started</button> </Link>
                    {/* <Link to={'/login/signup'}> <button id="lg">Login</button> </Link> */}
                </div>

                <div className='statsCon'>
                    <div id='stats'>
                        <span>500+</span>
                        <div>Active users</div>
                    </div>

                    <div id='stats'>
                        <span>100%</span>
                        <div>Transparency</div>
                    </div>

                    <div id='stats'>
                        <span>24/7</span>
                        <div>Available</div>
                    </div>
                </div>



                
            </div>

            {/* image content */}
            <div className='img'>
                {/* <img id="landingpageImg" src="../views/voting1.png" alt=""  /> */}
                <img id="landingpageImg" src="../views/voting2.png" alt="" />
            </div>
            </div>


            <div className='aboutCon'>
                <p>Why Choose Nacos-smart vote </p>
                <div id="abtTxt">Build by student for student's friendly user experience</div>

                <div className='gridContent'>
                    {gridAbout.map((grid) => {
                        return (
                        <div class="aboutContent" key={grid.id}>
                            <span className="hoverCon">
                                <span>{grid.hoverTxt}</span>
                                <button>{grid.hoverIcon}</button>
                            </span>
                            <span className={'icon'}>{grid.icon}</span>
                            <span>{grid.why}</span>
                        
                        </div>)
                    })
                    }
                </div>
            </div> 

            


            {/* last content */}
            <section className="tfooter">
                
                <img id="ftImg" src="../views/IMG-20251206-WA0008.jpg" alt="" />
                <div className="tp">
                    <p id="rd">Ready to make your voice heard?</p>
                    <p>Join hundreds of Nacos student  to change the future of our department</p>
                    <div className="actionCon">
                    <Link to={'/login/signup'}> <button id="crtAcc">Create account</button> </Link>
                        <Link to={'/login/signup'}> <button  id="sgnIn">Signin</button> </Link>
                    </div>
                </div>
                <footer>
                    <div className="fg">
                        <FaUserGraduate />
                        <span>Nacos-Smart vote</span>
                    </div>

                    <div>Created and managed by the computer science department</div>

                    <div>All rights to Nacos-Smart vote reserved &copy; {now.getFullYear()} </div>
                </footer>
            </section>


        </div>        

    </div>
  )
}

export default Landingpage
