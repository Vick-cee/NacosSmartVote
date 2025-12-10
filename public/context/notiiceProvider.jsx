import { createContext, useState, useEffect } from 'react'

const NoticeContext =  createContext({})

export const NoticeProvider = ({ children }) => {
    
    const [voteHistory, setVoteHistory] = useState([])
    const [elections, setElections] = useState([])
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    async function fetchVote() {
          
      setLoad(true)
        try {
        
        const res = await fetch('http://localhost:5000/api/vote',{
            method: 'GET',
            credentials: 'include'
        })
    
        const data = await res.json()
    
        console.log(data);
        
        setVoteHistory(data.data || [])
        setLoad(false)
    
    
        } catch (err) {
        
        console.log(err);
        setError(true)
        setMessage('network error')
    
        
        }
      
    }



    async function fetchElections() {
        setLoad(true)
        try {
  
          const res = await fetch('http://localhost:5000/api/candidate')
  
          const data = await res.json()
  
          setElections(data.data || [])
  
          setLoad(false)
  
          if(!res.ok){
            setError(true)
          }
      
        } catch (error) {
  
          console.log(error);
          setError(true)
          setLoad(false)
          setMessage('network error')
        }
    }
              
      
    useEffect(() => {

      fetchElections()
      fetchVote()

    },[])

    function reLoad() {
      fetchElections()
      fetchVote()
    }

  return (
    <NoticeContext.Provider value={{
        elections, 
        fetchElections, 
        voteHistory, 
        fetchVote, 
        load, 
        error, 
        setMessage, 
        message,
        reLoad
    }}>
        { children }
    </NoticeContext.Provider>
  )
}

export default NoticeContext
