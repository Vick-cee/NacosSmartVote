import { useState } from 'react'
import './App.css'
import '../public/dashboard/dashboard.css'
import Header from '../public/dashboard/header'
import Main from '../public/dashboard/main'

function App() {

  const [section, setSection] = useState('candidate')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  
  
  
  
  return (
    <>
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        section={section} 
        setSection={setSection}
      />
      <Main
        section={section} 
        setSection={setSection}
      />  
    </>
    
  )
}

export default App
