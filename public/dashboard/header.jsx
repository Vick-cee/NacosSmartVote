import React from 'react'
import HeaderComponent from "./headerComponent";

const Header = ({theme, setTheme, section, setSection, voteHistory, setVoteHistory, error}) => {
  return (
    <header>
      <HeaderComponent 
        theme={theme} 
        setTheme={setTheme} 
        section={section} 
        setSection={setSection} 
        voteHistory={voteHistory}
        setVoteHistory={setVoteHistory}
        error={error}  
      />
    </header>
  )
}

export default Header


