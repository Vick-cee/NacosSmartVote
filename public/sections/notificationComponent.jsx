import { FcCheckmark } from "react-icons/fc"; 
import { FcLock } from "react-icons/fc"; 
import { FcApproval } from "react-icons/fc"; 
import { FcFlowChart } from "react-icons/fc"; 
import { BsCheckCircleFill } from "react-icons/bs"; 
import { BsArrowLeft } from "react-icons/bs"; 
import { BiX } from "react-icons/bi";
import { FaUserGraduate } from "react-icons/fa";
import React from 'react'
import { useState, useContext } from 'react'
import { ImHistory } from "react-icons/im";
import { FiWifiOff } from "react-icons/fi";
import axios from 'axios'
import NoticeContext from "../context/notiiceProvider";

const NotificationComponent = ({section, setSection}) => {

  const { voteHistory, fetchVote, error } = useContext(NoticeContext)
  const [index, setIndex] = useState()
  let candidateData = (voteHistory[index === undefined? 0 : index])


  // path request for viewd vote history
  const setSectionAndUpdate = async (historyIndex, id) => {

    setIndex(historyIndex)

   try {
     const res = await axios.patch('http://localhost:5000/api/vote/seen',
      { id },
      { withCredentials: true })
      
      const data = await res.data
      fetchVote()

      console.log(data, 'update for seen history');
      
    
   } catch (error) {

    console.log(error);
    
   }    

  }


  return (
    <div className={`section ${section === 'notification'? 'active_section' : ''}`} id='notification'>
      
      <div id='back' onClick={() => setSection('candidate')}><BsArrowLeft /></div>
      <h2 id="noticeHeader">Notification</h2>
      {
        // network error message
        error? <div id="errMessage" style={{top:'60%'}}> <span id='icon'><FiWifiOff /></span> <div style={{fontSize:'16px'}}>try a stronger internet connection</div> </div> : 

        // empty vote history message
        voteHistory < 1 ? <div id="errMessage" style={{top:'60%'}}> <span id='icon'> <ImHistory /> </span> <div style={{fontSize:'16px'}}> you currently have no voting history</div> </div> : 

        // history content voted candidates and election 
        <div className="historyCon">
          {
            voteHistory.map((history, index) => {
              return (
                <div className="historyItem" key={index} onClick={() => setSectionAndUpdate(index, history._id)}>

                  <div className="h-flex">
                    <div id="statueText">Successful <FcCheckmark /></div>
                    {history.seen? <span> {new Date(history.timestamp).toLocaleString()} </span> : <span id="dot"></span>}
                  </div>

                  <div className="h-flex">
                    <span id="el-h">{history.electionSnapshot.name} - {history.position}</span>

                    {history.seen? <span>seen</span> : <span>{new Date(history.timestamp).toLocaleString()}</span>}
                  </div>

                  
                </div>
              )
            })

          }

          {/* mail pop up content container */}
          <div className="mailCon" style={{display: index >= 0 ? 'flex' : 'none'}}>
              <span id='x' onClick={() => setIndex()}><BiX /></span>

              <div className="statueCon_mail">
                <span id="check"><BsCheckCircleFill /></span>
                <span>Vote was successful</span>
              </div>

              <div className="dataGrid">

                <div className="data_con">
                  
                  <span id="dataText"> <span id="dataIcon"><FcApproval /></span> verified </span>
                  <span id="dataValue">100%</span>
                </div>

                <div className="data_con">
                  
                  <span id="dataText"> <span id="dataIcon"><FcFlowChart /></span> Level</span>
                  <span id="dataValue">{candidateData.candidateSnapshot.level}</span>
                </div>

                <div className="data_con">
                  
                  <span id="dataText"> <span id="dataIcon"><FcLock /></span> Secure</span>
                  <span id="dataValue">100%</span>
                </div>

              </div>

              <div className="infoCon">
                <span> <strong>Candidate:</strong> {candidateData.candidateSnapshot.name} </span>
                <span> <strong>Election Name:</strong> {candidateData.electionSnapshot.name} </span>
                <span> <strong>Election Position:</strong> {candidateData.position}</span>
              </div>

              <p> <FaUserGraduate/>Nacos-smart Vote </p>

          </div>

        </div>
        
      }
    </div>
  )
}

export default NotificationComponent
