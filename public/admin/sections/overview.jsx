import React from 'react'
import '../../sections/sections.css'
import OverviewData from './overviewData'
import { FiWifiOff } from "react-icons/fi"; 
import { RiLoader2Line } from "react-icons/ri"; 


const Overview = ({section, elections, error, load, candidates, reLoad}) => {

  return (
    <div  className={`section ${section === 'overview'? 'active_section' : ''}`} id='overview'>

          <div>
            <header id='htext'>Overview Dashboard </header>
            <div className='candidateHeader' style={{padding:'1rem'}}>
              <span id="htext2">Overview Data</span>
            </div>
          </div>

          { 
            load? <div id="loader"> <RiLoader2Line /></div> : 
            error? <div id="errMessage"> <span id='icon'><FiWifiOff /></span> <button onClick={() => reLoad()}>refresh</button> </div> : 
            <OverviewData 
              elections={elections}   
              candidates={candidates}
            /> 
          }  
      
    </div>
  )
}

export default Overview
