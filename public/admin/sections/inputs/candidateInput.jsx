import React, { useState } from 'react'
import axios from 'axios'
import { FaCheck } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';




const CandidateInput = ({setPrompt, elections, fetchCandidate, submitting, setSubmitting,}) => {




  const [form, setForm] = useState({
    name:'',
    position:'',
    electionId:'',
    manifesto:'',
    level:'',
    department:'',
  })
      
  const [errors, setErrors] = useState({
    name:'',
    position:'',
    electionId:'',
    manifesto:'',
    level:'',
    department:'',
  })

  const [file, setFile] = useState(null)

  const [isValid, setIsValid] = useState(false)
  const [message, setMessage] = useState('')


  const validators = {
      
        name: (value) => {
          
          if(!value) return <div id="err"> candidate name required <FaExclamationCircle/> </div> ;
          return <div id='chk'> <FaCheck /> </div>;
        },
  
        position: (value) => {
          if(!value) return <div id="err"> position required <FaExclamationCircle/> </div>;
          return <div id='chk'> <FaCheck /> </div>;
        },
  
        electionId: (value) => {
          if(!value) return <div id="err"> election name required <FaExclamationCircle/> </div>;
          return <div id='chk'> <FaCheck /> </div>;
        },
  
        manifesto: (value) => {
          if(!value) return <div id="err">manifesto required <FaExclamationCircle/> </div>;
          return <div id='chk'> <FaCheck /> </div>;
        },

        level: (value) => {
          if(!value) return <div id="err">level required <FaExclamationCircle/> </div>;
          return <div id='chk'> <FaCheck /> </div>;
        },

        
        department: (value) => {
          if(!value) return <div id="err"> department required <FaExclamationCircle/> </div>;
          return <div id='chk'> <FaCheck /> </div>;
        },

        image: () => <div></div>
      
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

    console.log(errState);
    

    if(errState) setIsValid(false);
    
    if(!errState) setIsValid(true);        
        
  }



  const handleChange = (e) => {

   
    
      
    const {name, value, files } = e.target;

    const newValue = name === 'image' ? files[0] : value;

    setForm({
      ...form,
      [name]: newValue
    })
    
    setErrors({
      ...errors,
      [name]: validators[name](newValue)
    })


    setTimeout(() => errChk(), 0);
  
  }
    




 const handleSubmit = async () => {
  const validatedErrors = {};
  let hasError = false;

  for (let key in validators) {
    const result = validators[key](form[key]);
    validatedErrors[key] = result;
    if (result.props.id === 'err') hasError = true;
  }

  if (hasError) {
    setMessage("invalid field captured");
    return;
  }

  setSubmitting(true);
  setMessage("");

  try {
    const data = new FormData();

    data.append("name", form.name);
    data.append("position", form.position);
    data.append("manifesto", form.manifesto);
    data.append("level", form.level);
    data.append("department", form.department);
    data.append("electionId", form.electionId);

    if (file) data.append("image", file); // IMPORTANT

    const res = await axios.post("/api/candidate", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    fetchCandidate();
    setPrompt("");
    setSubmitting(false);

  } catch (error) {
    console.log(error, "err at candidate upload");
    setSubmitting(false);
    setPrompt("");
  }
};



  return (
    <div>
      <div className="inputContainer">


        <div id='errM' style={{color:'red'}}>{message}</div>


              <div className='dateCon'>            
              <div>
                <label htmlFor="">Election name</label>
                <div id="inputCon">
                  <select value={form.electionId} name='electionId' onChange={handleChange}>
                    <option value={''}> Election name </option>
                    
                    {
                      elections.map((opt) => {
                        return (
                          <option value={opt._id} key={opt._id}> {opt.name} </option>
                        )
                      })
                    }
                  </select>
                </div>
                {errors.electionId}
              </div>

              <div>
                <label htmlFor="">Candidate name</label>
                <div id="inputCon">
                  <input type="text" placeholder="candidate name..." value={form.name} name='name' onChange={handleChange} />
                </div>
                {errors.name}
              </div>
              </div>

              <div className='dateCon'>
                <div>
                  <label htmlFor="">Position</label>
                  <div id="inputCon">
                    <input type="text" placeholder="position..." value={form.position} name='position' onChange={handleChange} />
                  </div>
                  {errors.position}
                </div>

                <div>
                  <label htmlFor="">manifesto</label>
                  <div id="inputCon">
                    <input type="text" placeholder="manifestoription..." value={form.manifesto} name='manifesto' onChange={handleChange}/>
                  </div>
                  {errors.manifesto}
                </div>
                
              </div>

              {/*  */}
              <div className='dateCon'>

                <div>
                  <label htmlFor="">Department</label>
                  <div id="inputCon">
                    <select
                      id='inputCon'
                      value={form.department}
                      name='department'
                      onChange={handleChange}>
                        <option value="computer science">computer science</option>
                        <option value="cyber security">cyber security</option>
                        <option value="software development">software development</option>
                        <option value="computer engineering">computer engineering</option>
                    </select>
                  </div>
                  {errors.department}
                </div>

                <div>
                  <label htmlFor="">Level</label>
                  <div id="inputCon">
                    <select value={form.level} name='level' onChange={handleChange}>
                      <option value="100L">100L</option>
                      <option value="200L">200L</option>
                      <option value="300L">300L</option>
                      <option value="400L">400L</option>
                    </select>
                  </div>
                  {errors.level}
                </div>


              </div>
              {/*  */}

              <div>
                <label htmlFor="">Image(optional)</label>
                <div id="inputCon">
                  <input type="file" name='image' onChange={(e) => setFile(e.target.files[0])}/>
                </div>
              </div>

             
              
              <div className='actCon'>
                  <button id='smt' onClick={() => handleSubmit()} disabled={submitting? true : false}>Submit</button>
                  <button id='cnl' onClick={() => setPrompt('')}>Cancel</button>
              </div>
              
             

            </div>
    </div>
  )
}

export default CandidateInput
