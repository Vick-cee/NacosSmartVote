import React from 'react'
import MenuComponent from './bodyComponent'
import BodyComponent from './menuComponent'

const Main = ({section, setSection}) => {

  
  return (
    <div className='main'>
        <BodyComponent 
          section={section} 
          setSection={setSection}
        />
        
        <MenuComponent 
          section={section} 
          setSection={setSection}
        />
    </div>
  )
}

export default Main
