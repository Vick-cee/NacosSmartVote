import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import './login.css'
import axios from 'axios'
import { RiLoader2Line } from "react-icons/ri";

const AdminProtectedRoute = ({children}) => {
        const [isAuth, setIsAuth] = useState(false)
        const [isLoading, setIsLoading] = useState(true)
        
        useEffect(() => {
            async function checkAuth() {
                try {
                    const res = await axios.get('http://localhost:5000/api/admin-auth',{
    
                        withCredentials: true
                    })
    
                    const data = res.data;
                    
    
                    if(data.authenticated) {
                        setIsAuth(true)
    
                    }else{
                        setIsAuth(false)
                    }
                    
                } catch (error) {
                    setIsAuth(false)
    
                } 
                finally {
                    
                    setIsLoading(false)
        
                }
            }
            checkAuth()
        },[])


        if(isLoading) return <div id="load" style={{
            position:'absolute',
            fontSize:'70px',
            top:'50%',
            left:'50%',
            transform:'translate(-50%, -50%)'
        }}> <RiLoader2Line /></div>
        
        return isAuth? children : <Navigate to="/login/signup" replace />
    
}

export default AdminProtectedRoute
