 
import { BiLoader } from "react-icons/bi"; 
import React from 'react'
import { useState } from 'react'
import './login.css'
import axios from 'axios'
import { FaLessThanEqual } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';


const Signup = ({authSection, setAuthSection}) => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    document.body.classList.add(theme)

    const [load, setLoad] = useState(false)

   
    const [form, setForm] = useState({
      username:'',
      matric:'',
      email:'',
      course:'',
      password:''
    })

    const [errors, setErrors] = useState({
      username:'',
      matric: '',
      email:'',
      course:'',
      password:''
    })

    const [message, setMessage] = useState('')
    const [isValid, setIsValid] = useState(false)

    

    

    const validators = {

      email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!value) return <div id="err"> Email required <FaExclamationCircle/> </div> ;
        if(!emailRegex.test(value)) return <div id="err"> Email field must be a valid type <FaExclamationCircle/> </div> ;
        return <div id='chk'> <FaCheck /> </div>;
      },

      matric: (value) => {
        if(!value) return <div id="err"> Matric required <FaExclamationCircle/> </div> ;
        if(value <= 20) return <div id="err"> Matric field must be a valid type <FaExclamationCircle/> </div> ;
        return <div id='chk'> <FaCheck /> </div>;
      },

      username: (value) => {
        if(!value) return '';
        if(value.length < 3) return <div id="err"> Username must be at least 3 character <FaExclamationCircle/> </div> ;
        return <div id='chk'> <FaCheck /> </div>;
      },

      course: (value) => {
        if(!value) return <div id="err"> Course is required <FaExclamationCircle/> </div>;
        return <div id='chk'> <FaCheck /> </div>;
      },

      password: (value) => {
        if(!value) return '';
        if(value.length < 6) return <div id="err"> Password must be at least 6 character <FaExclamationCircle/> </div> ;
        return <div id='chk'> <FaCheck /> </div>;
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
    

    
    // handle submit function
    const handleSubmit = async () => {

      if(!form.email || !form.password || !form.course || !form.matric || !form.username) return setMessage('all fields must be filled')


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
          const res = await axios.post('/api/signup',
            {
              email: form.email, matric: form.matric, password: form.password, username: form.username, course: form.course

            })      

            console.log(res.data);

            

            
            setLoad(false);
            setMessage(res.data.message);
            if(res.data.message !== 'new user signed in') return;
            setTimeout(() => {
              setAuthSection('pending')
            },2000)
            
              
      } catch (error) {
        
        console.log(error);
        setLoad(false);
        setMessage('failed check internet connection')


      }

    }

    
  return (
    <div className='body1'>
      
      <div id='loginCon'>
      
       
      <span id='header'>Signup</span>
      <div className="loginCon2">

        <span id='inputs'>
          <label htmlFor="email">Email</label>
          <input 

              type="email" 
              placeholder='@gmail'
              className='email'
              name='email'
              value={form.email}
              onChange={handleChange}
          />
          <div style={{color:'red'}}>{errors.email}</div>
        </span>

        <span id='inputs'>
          <label htmlFor="matric">Matric</label>
          <input 
              type="text" 
              placeholder='matric'
              className='matric'
              name='matric'
              value={form.matric}
              onChange={handleChange}
          />
          <div style={{color:'red'}}>{errors.matric}</div>
        </span>


        <span id='inputs'>
          <label htmlFor="username">Username</label>
          <input 
              type="text" 
              placeholder='username'
              className='username'
              name='username'
              value={form.username}
              onChange={handleChange}
          />
          <div style={{color:'red'}}>{errors.username}</div>
        </span>

        <span id='inputs'>
          <label htmlFor="course">Course</label>
          <div className="course">
            <select
                id='course'
                value={form.course}
                name="course"
                onChange={handleChange}>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Informatics">Informatics</option>
                  <option value="Computer engineering">Computer Engineering</option>
              </select>
            </div>
            <div style={{color:'red'}}>{errors.course}</div>
        </span>

        <span id='inputs'>
          <label htmlFor="password">Password</label>
          <input 
              type="password" 
              placeholder='password'
              className='password'
              name="password"
              value={form.password}
              onChange={handleChange}
          />
          <div style={{color:'red'}}>{errors.password}</div>
        </span>

        <button onClick={() => handleSubmit()}>Login</button>

      </div>
      </div>

       
        <div className="errTxt">
          {
            load? <div id='loadAni'><BiLoader /></div> : 
            <div style={{color: message === 'signup successfully'? 'green' : 'red',}}>{message}</div>
          }
         
        </div>       
        
    </div>
  )
}

export default Signup
