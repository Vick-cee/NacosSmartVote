import { FiSearch } from "react-icons/fi"; 
import { BsDatabaseFillSlash } from "react-icons/bs"; 
import React from 'react'
import CandidateList from '../sections/candidateList'
import { FiWifiOff } from "react-icons/fi"; 
import { RiLoader2Line } from "react-icons/ri"; 
import { useState, useEffect, useContext } from 'react';
import NoticeContext from "../context/notiiceProvider";


const CandidateComponent = ({section}) => {

  const { fetchVote, fetchElections, setMessage, message, reLoad} = useContext(NoticeContext)
  const [load, setLoad] = useState(false)
  const [error, setError] = useState(false)
  const [candidates, setCandidates] = useState([])
  const [search, setSearch] = useState('')

  

    
  async function fetchCandidates() {
      setLoad(true)
      try {

        const res = await fetch('http://localhost:5000/api/candidate')

        const data = await res.json()

        console.log(data);
        

        console.log(res)
        setCandidates(data.data || [])

        setLoad(false)

        if(!res.ok){
          setError(true)
        }
    
      } catch (error) {

        console.log(error);
        setError(true)
        setLoad(false)
      } 
  }
          
  useEffect(() => {
    fetchCandidates()
  },[])

  function reLd() {
    reLoad()
    fetchCandidates()
  }
  

  let newElectionName = candidates.map(c => c.electionId[0].name);
  let electionName = [...new Set(newElectionName)];

  electionName = electionName.filter((x) => x.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  

  
  return (
    <div className={`section ${section === 'candidate'? 'active_section' : ''}`} id='candidate'>
        
        <div>
          <header id='htext'>Elections Candidate</header>
          <div className='candidateHeader' style={{padding:'2rem 1rem'}}>
            <span id="htext2">Total Candidates are ({candidates.length})</span>
            <div className='search'>
              <FiSearch />
              <input 
                type="text" 
                placeholder='search...'
                value={search}
                onChange={((e) => setSearch(e.target.value))}
              />
            </div>
          </div>

          <div className="filterCon">  
              {
                  electionName.map((name, i) => {                            
                  return (
                      <button style={{backgroundColor: search === name? 'rgba(16, 192, 45, 1)' : ''}} onClick={() => setSearch(name)} key={i}>{name}</button>
                  )
                  })
              }
              <button onClick={() => setSearch('')} style={{display: !search? 'none' : 'block'}}>viewothers</button>
          </div>

        </div>
        
        
      
      {
        
        load? <div id="loader"> <RiLoader2Line /></div> : 
        error? <div id="errMessage"> <span id='icon'><FiWifiOff /></span> <button onClick={() => reLd()}>refresh</button> </div>  :
        
        candidates.length < 1 ? <div className="emptyListCon"> <div id="emptyList"> <BsDatabaseFillSlash />  </div> <span>no available election</span> </div> :
        electionName.length < 1 ? <div style={{textAlign:'center', color:'red'}}> No Election Was Found </div> :
        <CandidateList 
          candidates={candidates} 
          setError={setError} 
          error={error} 
          setLoad={setLoad} 
          load={load}  
          setSearch={setSearch}
          search={search}
          electionName={electionName}
          setMessage={setMessage}
          message={message}
          fetchVote={fetchVote}
          fetchElections={fetchElections}
        />

      }

    
    </div>
  )
}

export default CandidateComponent
