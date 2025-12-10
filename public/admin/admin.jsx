import React from 'react'
import { useState} from 'react'
import Header from './header'
import Content from './content'


const Admin = () => {

  const [section, setSection] = useState('overview')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  
  return (
    
    <>
      <Header theme={theme} setTheme={setTheme} section={section} setSection={setSection} />
      <Content 
        section={section} 
        setSection={setSection} 
      />
    </>
  )
}

export default Admin
