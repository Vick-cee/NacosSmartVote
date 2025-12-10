import React from 'react'
import { useState } from 'react'
import './login.css'
import axios from 'axios'
import { BiLoader } from "react-icons/bi"; 
import { useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';



const Login = ({setAuthSection}) => {
    const navigate = useNavigate()

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    document.body.classList.add(theme)

    const [load, setLoad] = useState(false)

    const [form, setForm] = useState({
      email:'',
      password:''
    })
    
    const [errors, setErrors] = useState({
      email:'',
      password:''
    })
    
    const [message, setMessage] = useState('')
    const [isValid, setIsValid] = useState(false)
    

    // validation functions
    const validators = {

      email: (value) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!value) return <div id="err"> Email is required <FaExclamationCircle/> </div>;

        if(!emailRegex.test(value)) return <div id="err">Invalid email format <FaExclamationCircle/> </div>;

        return  <div id="chk"> <FaCheck /> </div>;

      },

     
      password: (value) => {

        if(!value) return '';

        if(value.length < 6) return <div id="err">Password must be at least 6 character <FaExclamationCircle/> </div>;

        return <div id="chk"> <FaCheck /> </div> ;

      },

    }


    function errChk() {

        let obj = Object.keys(form)

        let opp = obj.map((key) => {
          let objProps = (validators[key](form[key])).props;

          return objProps
        })

        let search = opp.map((x) => x.id === 'err')

        let errState = [...new Set(search)]

        errState = errState.find((x) => x !== false)

        if(errState) setIsValid(false);
        
        if(!errState) setIsValid(true);        
        
    }


    // handle change for input
    const handleChange = (e) => {
      
      const {name, value} = e.target;

      setForm({
        ...form,
        [name]: value
      })
     
      setErrors({
        ...errors,
        [name]: validators[name](value)
      })

    setTimeout(() => errChk(), 0);
      
    }





    // handle submit function for login
    const handleSubmit = async () => {

      if(!form.email || !form.password) return setMessage('all fields must be filled')

      const validatedErrors = {};
        let hasError = false

        for(let key in validators) {

          const result = validators[key](form[key]);

          validatedErrors[key] = result;

          if (result.props.id === 'err') {
            hasError = true
          }
      }

      if(hasError) {
        setMessage('invalid field captured');
        return;
      }

    setMessage('')
     
      setLoad(true)  

      try {
          const res = await axios.post('/api/login',
            {
              email: form.email, password: form.password
            },{withCredentials: true}
          )          

          setLoad(false)

          if(res.data.message === 'unverified') return setMessage('user is not verified')

          if(res.data.message === 'pending') return setMessage('access statue is still pending...')

          else {
            setMessage('login successfully');
            setTimeout(() => {
              navigate('/dashboard')
            },500)
          }
            
        
       } catch (error) {
        
        console.log(error)
        setLoad(false)
        setMessage(`failed check internent connection`)
        
       }

    }

    
  return (
    <div className='body1'>

      <div id='loginCon'>
        
        <p></p>
        
        <span id='header'>Login</span>



        <span id='inputs'>
          <label htmlFor="email">Email</label>
          <input 
              type="email" 
              placeholder='@gmail'
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
          />
          {errors.email}
        </span>


        <span id='inputs'>
          <label htmlFor="password">Password</label>
          <input 
              type="password" 
              placeholder='password'
              id='password'
              name='password'
              value={form.password}
              onChange={handleChange}
          />
          {errors.password}
        </span>

        

        <button onClick={() => handleSubmit()}>Login</button>

        <div style={{textAlign:'center', margin:'0'}}>
            {
              load? <div id='loadAni'><BiLoader /></div> : 
              <div style={{color: message === 'login successfully'? 'green' : 'red', textAlign:'center', margin:'0'}}>{message}</div>
            }
        </div>
        
        <a onClick={() => setAuthSection('admin')} style={{cursor:'pointer', color:'black'}} id="adminBtn">Login as admin</a>
      </div>
    </div>
  )
}

export default Login
