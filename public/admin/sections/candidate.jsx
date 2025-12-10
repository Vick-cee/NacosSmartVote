import { FiEdit2 } from "react-icons/fi"; 
import { FaSpinner } from "react-icons/fa";
import { FaUsers } from "react-icons/fa"; 
import { FiWifiOff } from "react-icons/fi"; 
import { RiLoader2Line } from "react-icons/ri"; 
import React from 'react'
import { BiX } from "react-icons/bi"; 
import { useState } from "react";
import CandidateList from './candidateList'
import CandidateInput from "./inputs/candidateInput";
import '../sections/section.css'


const Candidate = ({candidates, section, elections, load, error, fetchCandidate, setCandidates, reLoad}) => {
 
  

  const [prompt, setPrompt] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)

  
  return (

    <div  className={`section ${section === 'candidate'? 'active_section' : ''}`} id='candidate'>
      
      <div className='candidatedCon'>
          <div>
            <header id='htext'>Candidate Management </header>
            <div className='candidateHeader'>
              <span id="htext2">Edit and manage candidates</span>
              <span> <button id='addCandidate' onClick={() => setPrompt('active') }>Add candidate </button> </span>
            </div>
          </div>

          
          {
            candidates.length > 0 ? 
            <CandidateList 
              candidates={candidates} 
              setCandidates={setCandidates} 
              setPrompt={setPrompt} 
              elections={elections} 
              fetchCandidate={fetchCandidate}
              submitting={submitting}
              setSubmitting={setSubmitting}
              failed={failed}
              setFailed={setFailed}
              reLoad={reLoad}
            /> : 

            load? <div id="loader"> <RiLoader2Line /></div> :
            error? <div id="errMessage"> <span id='icon'><FiWifiOff /></span> <button onClick={() => reLoad()}>refresh</button> </div> : 

            <div className="addCan">
              <div style={{fontSize:'100px'}}><FaUsers /></div>
              <button id='addCandidate' onClick={() => setPrompt('active')}>Add candidate <span style={{fontSize:'18px'}}> <FiEdit2 /> </span> </button>
            </div>
          }

          {/* submitting animation */}
          <span id="loadAni" style={{display: submitting? 'flex' : 'none'}}><FaSpinner /></span>
          <span id="failedErr">{failed? 'failed to submit election' : ''}</span>
                             

        
         <div className='prompt' style={{display: prompt !== 'active'? 'none':'flex'}}>
           <span id='x' onClick={() => setPrompt('')}><BiX /></span>
          <CandidateInput 
            setPrompt={setPrompt}
            elections={elections} 
            fetchCandidate={fetchCandidate}
            setSubmitting={setSubmitting}
            submitting={submitting}
          />
         </div>
      </div>
    </div>
  )
}

export default Candidate
