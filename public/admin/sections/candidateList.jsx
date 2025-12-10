import { MdOutlineDeleteForever } from "react-icons/md"; 
import { FaUserCircle } from "react-icons/fa"; 
import { FiEdit2 } from "react-icons/fi"; 
import React from 'react'
import '../../sections/candidate.css'
import '../../sections/sections.css'
import axios from 'axios'


const CandidateList = ({candidates, submitting, setSubmitting, setFailed, reLoad}) => {


  const candidateDelete = async (id) => {
    setSubmitting(true)    
    try {
      const res = await axios.delete(`http://localhost:5000/api/candidate/${id}`)

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

    
  return (
    <div>

     {
       candidates? <div className='candidateCon'>
        {
          candidates.map((candidate) => {
            return(
              <div className='candidateCard' key={candidate._id}>
                <div className="userIcon"> 
                  <div id="userImg"> <img src={!candidate.image? '../../views/file_000000002140724682aedd987f1d1515.png' : candidate.image} alt="" /> </div> 
                </div>

                <div className="liCon">
                  <li style={{color:'rgba(18, 134, 105, 1)'}}> Position : {candidate.position}</li>

                  <li> 
                    <div style={{color:'#555'}}>Title: {candidate.electionId[0].name}</div>
                  </li>

                  <div id="liDits">
                    <li>Fullname : {candidate.name} </li>
                    <li>Dpt : {candidate.department} </li>
                    <li>Level : {candidate.level} </li>
                  </div>

                </div>
                <p id="actionBtn">
                  <button 
                    style={{color:'red'}} 
                    onClick={() => candidateDelete(candidate._id)}
                    disabled={submitting? true : false}
                    > 
                    <MdOutlineDeleteForever />
                  </button>
                </p>             
              </div>               
            )
          })
        }
       </div> :
       <div> list is empty</div>
     }
    </div>
  )
}

export default CandidateList
