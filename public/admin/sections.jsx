import { GrUserAdmin } from "react-icons/gr"; 
import React from 'react'
import { useState, useEffect } from 'react'
import '../sections/sections.css'
import Candidate from './sections/candidate'
import Overview from './sections/overview'
import Election from './sections/election'
import Verify from './sections/verify'
import Nav from './nav'

const Sections = ({section, setSection, setLists}) => {


  const [elections, setElections] = useState([])
  const [loadEl, setLoadEl] = useState(false)
  const [loadCan, setLoadCan] = useState(false)
  const [errorEl, setErrorEl] = useState(false)
  const [errorCan, setErrorCan] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [candidates, setCandidates] = useState([])
  
  
    async function fetchElection() {
        setLoadEl(true)
        try {
  
          const res = await fetch('http://localhost:5000/api/election')
  
          const data = await res.json()
  
          setElections(data.data || [])

          setLoadEl(false)
          console.log(data.data);
          

          if(!res.ok){
            setErrorEl(true)
          }
      
        } catch (error) {
  
          console.log(error);
          setErrorEl(true)
          setLoadEl(false)
        }
      }
  
    useEffect(() => {

      fetchElection()

    },[])


    async function fetchCandidates() {
            setLoadCan(true)
            try {
      
              const res = await fetch('http://localhost:5000/api/candidate')
      
              const data = await res.json()
      
              setCandidates(data.data || [])
      
              setLoadCan(false)
      
              if(!res.ok){
                setErrorCan(true)
              }
          
            } catch (error) {
      
              console.log(error);
              setErrorCan(true)
              setLoadCan(false)
            }
      }
          
    useEffect(() => {
      fetchCandidates()
    },[])


    function reLoad() {
      fetchCandidates()
      fetchElection()
    }

    

  
  return (
    <div className='body'>
        <button className="accessBtn"
          onClick={() => setSection('verify')}
        >
          <GrUserAdmin />
        </button>

        <Candidate 
          section={section} 
          setSection={setSection}  
          elections={elections}           
          load={loadCan}
          setLoad={setLoadCan}
          error={errorCan}
          setError={setErrorCan}
          fetchCandidate={fetchCandidates}
          candidates={candidates}
          setCandidates={setCandidates}
          reLoad={reLoad}
        />

        <Overview 
          section={section} 
          setSection={setSection} 
          elections={elections} 
          load={loadEl} 
          setLoad={setLoadEl} 
          setError={setErrorEl} 
          error={errorEl}
          candidates={candidates} 
          fetchCandidates={fetchCandidates}
          fetchElection={fetchElection}
          reLoad={reLoad}
        />

        <Election 
          section={section} 
          setSection={setSection} 
  
          setLists={setLists}
          elections={elections}
          load={loadEl}
          error={errorEl}
          setPrompt={setPrompt}
          prompt={prompt}
          fetchElection={fetchElection}
          reLoad={reLoad}
        />

        <Verify 
          section={section} 
          setSection={setSection}
        />
        <div className='nav'><Nav section={section} setSection={setSection}/> </div>
    </div>
  )
}

export default Sections
