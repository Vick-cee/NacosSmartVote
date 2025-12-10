import { BsDatabaseFillSlash } from "react-icons/bs"; 
import { FiWifiOff } from "react-icons/fi"; 
import { RiLoader2Line } from "react-icons/ri"; 
import React from 'react'
import {useState, useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import axios from 'axios'
import VerifyList from './verifyList';

const Verify = ({section, setSection}) => {

    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState('')
    const [pending, setPending] = useState([
        // {
        //     _id: 'iuiu65564',
        //     username:'roland',
        //     email:'aminuroland452@gmail.com',
        //     course:'computer science',
        //     matric: null,
        //     statue: 'pending'
        // },

        // {
        //     _id: 'iuiu6556400',
        //     username:'ijese',
        //     email:'ijese67@gmail.com',
        //     course:'computer science',
        //     matric: null,
        //     statue: 'pending'
        // },
    ])

    

    async function fetchPendingUser() {
        setLoad(true)
        try {
            const res = await fetch('/api/admin/pending-user')

            const data = await res.json()

            console.log(res,'pening');
            
            setPending(data.data || [])
            setLoad(false)

        } catch (error) {

            console.log(error);
            setLoad(false)
            setError(true)
            
        }
    }


    async function grantAccess(id, username, email) {

        setLoad(true)
        try {

            const res = await axios.patch('/api/admin/approve-user',{
                id, username, email
            })

            let data = res.data
            console.log(data);
            fetchPendingUser()
            setLoad(false)
            
            
        } catch (error) {
            
            console.log(error)
            setError(true)
        }
    }


    async function denyAccess(id, username, email) {

        setLoad(true)
        try {

            const res = await axios.delete('/api/admin/approve-user',{
                id, username, email
            })

            let data = res.data
            console.log(data);
            fetchPendingUser()
            setLoad(false)
            
            
        } catch (error) {
            
            console.log(error)
            setError(true)
        }
    }


    useEffect(() => {
        fetchPendingUser()
    },[])

    return (
        <div className={`section ${section === 'verify'? 'active_section' : ''}`} id='verify'>
            <div>
                <header id='htext'>Access Management </header>
                <div className='candidateHeader'>
                    <span id="htext2"> Verify And Grant Access</span>
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
            </div>


        {
            load? <div id="loader"> <RiLoader2Line /></div> : 
            error? <div id="errMessage"> <span id='icon'><FiWifiOff /></span> <button onClick={() => fetchPendingUser()}>refresh</button> </div> :
            pending.length === 0? <div className="emptyListCon"> <div id="emptyList"> <BsDatabaseFillSlash /> </div> <span>no pending user</span> </div> :
            <VerifyList 
                pending={pending.filter((x) => x.email.toLowerCase().includes(search.toLowerCase()))}
                grantAccess={grantAccess}
                denyAccess={denyAccess}
            />
        }
            
            


        </div>
    )
}

export default Verify
