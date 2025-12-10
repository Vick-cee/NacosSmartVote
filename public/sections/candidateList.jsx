import { FaSpinner } from "react-icons/fa"; 
import { ImUserCheck } from "react-icons/im"; 
import { FaCheck } from "react-icons/fa"; 
import React from 'react'
import { useState } from 'react';
import '../sections/candidate.css'
import { FaUserCircle } from "react-icons/fa"; 
import NoticeContext from "../context/notiiceProvider";

import axios from 'axios'

    const CandidateList = ({candidates, electionName, fetchVote, fetchElections, setMessage, message}) => {

    const [voting, setVoting] = useState(false)
    
    
    const candidateVote = async (candidateId, electionId, position) => {

      console.log(candidateId, electionId, position);
      
      
      setVoting(true)
      setMessage('')

      if(!candidateId || !electionId || !position) return alert('something went wrong you will be redirected to login')

      try {

        const res = await axios.post('http://localhost:5000/api/vote',{

          candidateId, electionId, position
          
        },{withCredentials: true})

        if(res.data.message) {

          setMessage('casted successfully')
          fetchVote()
          fetchElections()
          setVoting(false)

        }else{

          setMessage('vote casted succesfully')

        }

        
        console.log(message,'at vote');
        
      } catch (error) {

        setMessage('network issue')
        setVoting(false)
        console.log(error,'at vote')
        
      }
        
    }

    
return (
  <div className="overflowCon_el">

      <div className='positionCon'>
        <div id={'voteStatue'} style={{display: voting? 'flex' : 'none'}}>
          <span id="loader"><FaSpinner /></span>
        </div>
      </div> 
      

      {electionName.map((election, index) => {

        // candidates under this election name
        const groupedCandidates = candidates.filter(
          c => c.electionId[0].name === election
        );

        // unique positions inside this election (governor, presidency, etc.)
        const positions = [...new Set(groupedCandidates.map(c => c.position))];

        return (
          <div key={index}>
            <h2 id="electionName">
              {election}
              <div className="elTxtCon">
                <li>positions</li>
                <span id="notice">{positions.length}</span>
              </div>
            </h2>

            {positions.map((position, idx) => {
              const candidateList = groupedCandidates.filter(
                c => c.position === position
              );

              return (
                <div key={idx}>
                  <h3 style={{marginLeft:'1rem'}}>{position.toUpperCase()}</h3>
                    <div className="rowCon">
                      {candidateList.map((x, i) => (
                        <div className="candidateCard" key={i}>

                          <div className="userIcon">
                            <div id="userImg">
                              <img src={!x.image? '../views/file_000000002140724682aedd987f1d1515.png' : x.image} />
                            </div>
                          </div>

                          <div className="liCon">
                            <li style={{ color: "grey" }}>Position - {x.position}</li>
                            <li>
                              <span id="manu">Election - {x.electionId[0].name}</span>
                            </li>

                            <div id="liDits">
                              <li>Fullname : {x.name}</li>
                              <li>Dpt : {x.department}</li>
                              <li>Level : {x.level}</li>
                            </div>
                          </div>

                          <p id="voteBtn">
                            <button
                              onClick={() =>
                                candidateVote(x._id, x.electionId[0]._id, x.position)
                              }
                              disabled={voting}
                            >
                              Click Vote
                            </button>
                          </p>
                        </div>
                      ))}
                    </div>
                </div>
              );
            })}
          </div>
        );
      })}

  </div>
);
  
}

export default CandidateList
  