import { FiWifiOff } from "react-icons/fi"; 
import { RiLoader2Line } from "react-icons/ri"; 
import { FaTrashAlt } from "react-icons/fa"; 
import { GiPauseButton } from "react-icons/gi"; 
import { BiX } from "react-icons/bi"; 
import React from 'react'
import { useState } from 'react'
import { FaChartBar } from "react-icons/fa"; 
import { FaUsers } from "react-icons/fa"; 
import { FiEdit2 } from "react-icons/fi"; 
import { FaSpinner } from "react-icons/fa";
import '../../sections/candidate.css'
import './section.css'

import ElectionInput from "./inputs/electionInput";
import axios from 'axios'





const Election = ({elections, section, prompt, setPrompt, error, load, fetchElection, reLoad}) => {

  
  const [submitting, setSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)
    
    
    const handleDelete = async (id) => {
      setSubmitting(true)
      try {
        const res = await axios.delete(`http://localhost:5000/api/election/${id}`)

        const data = await res.data
        console.log(data);

        
        reLoad()
        setSubmitting(false)
        

      } catch (error) {

        console.log(error);
        setSubmitting(false)
        setFailed(true)
        
      }
    }

    const setStatue = async (id, statue) => {
      setSubmitting(true)      
      try {
        const res = await axios.patch(`http://localhost:5000/api/election/${id}?statue=${!statue}`)

        const data = await res.data
        console.log(data);
        fetchElection()
        setSubmitting(false)

      } catch (error) {

        console.log(error);
        setSubmitting(false)
        setFailed(true)
        
      }
    }
    

  return (
    <div className={`section ${section === 'election'? 'active_section' : ''}`} id='election'>
          <div>
            <header id='htext'>Election Management </header>
            <div className='candidateHeader'>
              <span id="htext2">Edit and manage election</span>
              <span> <button id='addCandidate' onClick={() => setPrompt('active') }>Add election </button> </span>
            </div>
          </div>

          
          {
            
            elections.length > 0 ? 
            <div className="elContainer">
              {
                elections.map((election) => {
                  return (
                    <div key={election._id} className="elCon"> 

                      <div className="elDetail">
                        <span id="name"> {election.name} </span>
                        <span> 
                          {
                            election.completed?  <span id="statue" style={{backgroundColor:'rgba(67, 63, 63, 0.27)', color:'rgb(60, 61, 60, 1)'}}>Completed</span> :
                            election.statue? 
                              <span id="statue" style={{backgroundColor:'rgba(60, 231, 60, 1)'}}>Active</span> : 
                              <span style={{backgroundColor:'rgba(5, 60, 43, 1)', color:'rgba(60, 231, 60, 1)'}} id="statue">Draft</span> 
                          } 
                        </span>
                      </div>

                      <p>{election.position}</p>

                      <div className="details">
                        <span id="position">Position: {election.position}</span>
                        <span id="candidates">{election.candidates.length} Candidates</span>
                        <span id="date"> {new Date(election.start).toLocaleString()}</span>
                      </div>

                      <div className="actBtn">
                        <button 
                          onClick={() => setStatue(election._id, election.statue)} 
                          disabled={election.completed? true : submitting? true : false}
                          > 
                          {election.completed? '' : <GiPauseButton />}
                        </button>

                        <button  
                          onClick={() => handleDelete(election._id)} 
                          disabled={submitting? true : false}
                        > 
                          <FaTrashAlt />
                        </button>
                      </div>

                    </div>
                  )
                })
              }
            </div> : load? <div id="loader"> <RiLoader2Line /></div> : 
            error? <div id="errMessage"> <span id='icon'><FiWifiOff /></span> <button onClick={() => reLoad()}>refresh</button> </div> : 

            <div className="addCan">
              <div style={{fontSize:'100px'}}><FaChartBar /></div>
              <button id='addCandidate' onClick={() => setPrompt('active')}>Add election <span style={{fontSize:'18px'}}> <FiEdit2 /> </span> </button>
            </div>
          }

          {/* submitting animation */}
          <span id="loadAni" style={{display: submitting? 'flex' : 'none'}}><FaSpinner /></span>
          <span id="failedErr">{failed? 'failed to submit election' : ''}</span>
                   
          <div className='prompt' style={{display: prompt !== 'active'? 'none':'flex'}}>
          
            <span id='x' onClick={() => setPrompt('')}><BiX /></span>
            <ElectionInput elections={elections} 
              fetchElection={fetchElection} 
              setSubmitting={setSubmitting} 
              submitting={submitting} 
              setFailed={setFailed} 
              setPrompt={setPrompt}
            />
          
          </div>
    </div>
  )
}

export default Election
