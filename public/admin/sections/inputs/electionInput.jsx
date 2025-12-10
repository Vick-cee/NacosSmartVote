import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { FaLaptopHouse } from 'react-icons/fa'
import { FaCheck } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';

const ElectionInput = ({fetchElection, submitting, setSubmitting, setFailed, setPrompt}) => {


   
    

    const [form, setForm] = useState({
          name:'',
          position:'',
          desc:'',
          start:'',
          end:'',
          statue:''
        })
    
        const [errors, setErrors] = useState({
          name:'',
          position:'',
          desc:'',
          start:'',
          end:'',
          statue:''
        })
    
        const [message, setMessage] = useState('')
        const [isValid, setIsValid] = useState(false)
    
        
    
        
    
        const validators = {
    
          
          name: (value) => {
            
            if(!value) return <div id="err"> election name required <FaExclamationCircle/> </div> ;
            return <div id='chk'> <FaCheck /> </div>;
          },
    
          position: (value) => {
            if(!value) return <div id="err"> position required <FaExclamationCircle/> </div>;
            return <div id='chk'> <FaCheck /> </div>;
          },
    
          desc: (value) => {
            if(!value) return <div id="err"> desc required <FaExclamationCircle/> </div>;
            return <div id='chk'> <FaCheck /> </div>;
          },
    
          start: (value) => {
            if(!value) return <div id="err">start date required <FaExclamationCircle/> </div>;
            return <div id='chk'> <FaCheck /> </div>;
          },

          end: (value) => {
            if(!value) return <div id="err">end date required <FaExclamationCircle/> </div>;
            return <div id='chk'> <FaCheck /> </div>;
          },

          
          statue: (value) => {
            if(!value) return <div id="err"> statue required <FaExclamationCircle/> </div>;
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

    setSubmitting(true)
    
      try {

        const res = await axios.post('/api/election',
          {
            name: form.name, 
            position: form.position, 
            desc: form.desc, 
            start: form.start,
            end: form.end, 
            statue: form.statue
          })

        console.log(res);
        fetchElection()
        setPrompt('')

        setSubmitting(false)

        
        
      } catch (error) {

        console.log(error,'err at election');
        setSubmitting(false)
        
        setFailed(true)
        setPrompt('')
      }
      
    }
    
  
  return (

      <div className="inputContainer">
              {/*  */}

              <div id='errM' style={{color:'red'}}>{message}</div>

              <div className='dateCon'>

                <div>
                  <label htmlFor="">Election name</label>
                  <div id="inputCon">
                    <input type="text" placeholder="Election name..." value={form.name} name='name' onChange={handleChange}/>
                  </div>
                  {errors.name}
                </div>

                <div>
                  <label htmlFor="">Position</label>
                  <div id="inputCon">
                    <input type="text" placeholder="Position..." value={form.position} name='position' onChange={handleChange}/>
                  </div>
                  {errors.position}
                </div>

              </div>
              {/*  */}

              <div>
                <label htmlFor="">Description</label>
                <div id="inputCon">
                  <input type="text" placeholder="Description..." value={form.desc} name='desc' onChange={handleChange} />
                </div>
                {errors.desc}
              </div>

              {/*  */}
              <div className='dateCon'>

                <div>
                  <label htmlFor="">Start</label>
                  <div id="inputCon">
                    <input type="date" value={form.start} name='start' onChange={handleChange}/>
                  </div>
                  {errors.start}
                </div>

                <div>
                  <label htmlFor="">End</label>
                  <div id="inputCon">
                    <input type="date" value={form.end} name='end' onChange={handleChange} />
                  </div>
                  {errors.end}
                </div>


              </div>
              {/*  */}

              <div>
                <label htmlFor="">Statue</label>
                <div id="inputCon">
                  <select style={{padding: '1rem 1rem 1rem 1rem'}} value={form.statue} name='statue'  onChange={handleChange} >
                    <option value=''>choose...</option>
                    <option value='false'>Draft</option>
                    <option value='true'>Active</option>
                  </select>
                </div>
                {errors.statue}
              </div>

              <div className='actCon'>
                  <button id='smt' onClick={() => handleSubmit()} disabled={submitting? true : false}>Submit</button>
                  <button id='cnl' onClick={() => setPrompt('')}>Cancel</button>
              </div>
              
              { message }

            </div>
  )
}

export default ElectionInput
