import { BsDatabaseFillSlash } from "react-icons/bs"; 
import React from 'react'
import { useState, useContext} from 'react' 
import './poll.css'
import { FiSearch } from "react-icons/fi";
import ElectionPollList from './electionPollList';
import NoticeContext from '../context/notiiceProvider';
import { FiWifiOff } from "react-icons/fi"; 
import { RiLoader2Line } from "react-icons/ri"; 


const Electionpoll = ({section}) => {

    const { elections, fetchElections, error, load, reLoad } = useContext(NoticeContext)
    const [search, setSearch] = useState('')
    


    // total election id
    let electionName = elections.map((election) => {
        return election.electionId[0].name
    })

    electionName = [...new Set(electionName)]

    electionName = electionName.filter((x) => x.toLocaleLowerCase().includes(search.toLocaleLowerCase()))


  return (
        <div className={`section ${section === 'poll' ? 'active_section' : ''}`} id="poll">

            <div style={{padding:'.5rem'}}>
                <div className='candidateHeader' style={{padding:'1rem'}}>
                    <span id="htext2"> Election Results Counts</span>
                    <div className='search'>
                        <FiSearch />
                        <input 
                            type="text" 
                            placeholder='search...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                error? <div id="errMessage"> <span id='icon'><FiWifiOff /></span> <button onClick={() => reLoad()}>refresh</button> </div> :
                elections.length < 1 ? <div className="emptyListCon"> <div id="emptyList"> <BsDatabaseFillSlash />  </div> <span>no available election</span> </div> :
                electionName.length < 1 ? <div style={{textAlign:'center', color:'red'}}> No Election Was Found </div> :
                <ElectionPollList 
                    elections={elections}
                    electionName={electionName}
                    search={search}
                    setSearch={setSearch}
                />                   
            }

           

        </div>
    );
}

export default Electionpoll
