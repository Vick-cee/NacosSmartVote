import React from 'react'
import { BsCheck2Square } from "react-icons/bs"; 
import { HiOutlineStatusOnline } from "react-icons/hi"; 
import { HiUsers } from "react-icons/hi"; 
import { AiOutlineLineChart } from "react-icons/ai"; 
import { FaTrashAlt } from "react-icons/fa"; 
import { GiPauseButton } from "react-icons/gi"; 


const OverviewData = ({elections, candidates}) => {
  

  let totalElection = elections.length
  let activeElection = elections.filter((election) => election.statue === true)
  let completedElection = elections.filter((election) => election.completed === true)

  

    
  return (
    <div>
      <div className='dataOverview'>

        <div className='dataCon'>
          <div className='dataType'> 
            <span>Total Elections</span> <span>{totalElection}</span> 
          </div>
          <div id='dataIcon' style={{backgroundColor:'rgba(23, 187, 69, 0.42)',color:''}}><AiOutlineLineChart /></div>
        </div>

        <div className='dataCon'>
          <div className='dataType'> 
            <span>Total Candidate</span> <span>{candidates.length}</span> 
          </div>
          <div id='dataIcon' style={{backgroundColor:'rgba(130, 42, 198, 0.38)',color:''}}><HiUsers /></div>
        </div>

        <div className='dataCon'>
          <div className='dataType'> 
            <span>Active Election</span> <span>{activeElection.length}</span> 
          </div>
          <div id='dataIcon' style={{backgroundColor:'rgba(194, 183, 30, 0.21)',color:''}}><HiOutlineStatusOnline /></div>
        </div>

        <div className='dataCon'>
          <div className='dataType'> 
            <span>Completed</span> <span>{completedElection.length}</span> 
          </div>
          <div id='dataIcon' style={{backgroundColor:'rgba(212, 37, 98, 0.36)',color:''}}><BsCheck2Square /></div>
        </div>

      </div>

      <div style={{fontSize:'20px', fontWeight:'600', padding:'0rem 0rem 0rem 1rem'}}> {elections.length < 1? '' : 'Election History'} </div>

      
  
    <div>
      {
        elections.map((election) => {
          return (
            <div className="elCon" style={{border:'none'}}> 
                <div className="elDetail">
                  <span id="name"> Name: {election.name } </span>
                </div>

                <p>Presidency</p>
                
                <div className="details">
                  <span id="position">Position: {election.position}</span>
                  <span id="candidates">Candidates {election.candidates.length} </span>
                  <span id="date">{new Date(election.createdAt).toLocaleString()}</span>
                </div>

                <div className="actBtn">
                  <button> <GiPauseButton /> </button>
                  <button> <FaTrashAlt /></button>
                </div>

            </div>
          )
        })
      }
    </div>
      

    </div>
  )
}

export default OverviewData
