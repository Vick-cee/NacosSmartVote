import React from 'react'
import '../sections/sections.css'
import CandidateComponent from '../sections/candidateComponent.jsx'
import Navigation from '../menu/navigation.jsx'
import Electionpoll from '../sections/electionpoll.jsx'
import Profile from '../sections/profile.jsx'
import NotificationComponent from '../sections/notificationComponent.jsx'

const BodyComponent = ({section, setSection}) => {
  
  return (
    <div className='body'>
      <CandidateComponent section={section} setSection={setSection}/>
      <Electionpoll section={section} setSection={setSection}/>
      <NotificationComponent section={section} setSection={setSection} />
      <Profile section={section} setSection={setSection} />
      <div className='nav'><Navigation section={section} setSection={setSection}/> </div>
    </div>
  )
  
}

export default BodyComponent
