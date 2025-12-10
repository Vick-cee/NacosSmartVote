import React from 'react'
import Menu from './menu'
import Sections from './sections'


const Content = ({section, setSection}) => {
  return (
    <div className='main'>
      <Menu section={section} setSection={setSection}/>
      <Sections section={section} setSection={setSection}/>      
    </div>
  )
}

export default Content
