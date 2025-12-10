import React from 'react'
const ElectionPollList = ({elections, electionName}) => {
  return (
        <div className='overflowCon_el'>
                {electionName.map((name, i) => {
                    
                    // all candidates belonging to this election name
                    let groupedCandidates = elections.filter(x => x.electionId[0].name === name);

                    // get unique positions inside this election
                    let positions = [...new Set(groupedCandidates.map(x => x.position))];

                    return (

                        <div key={i} >
                            <h2 id='electionName'>
                                {name} 
                                <div className='elTxtCon'>
                                    <li>positions</li>
                                    <span id='notice'>{positions.length}</span>
                                </div>
                            </h2>

                            {/* LOOP POSITIONS */}
                            {positions.map((pos, index) => {
                                // candidates under this specific position
                                let candidates = groupedCandidates.filter(x => x.position === pos);

                                return (
                                    <div key={index} style={{ marginLeft: "20px",}}>
                                            <h3 id='canHeader'>{pos} position</h3>

                                            {/* LOOP CANDIDATES */}
                                            <div className='candidateScroll'>
                                                {
                                                    candidates.map((c, j) => (
                                                    <div key={j} style={{ marginLeft: "20px",}} className='canCard'>
                                                        <img src={!c.image? '../views/file_000000002140724682aedd987f1d1515.png' : c.image} alt="" />
                                                        <div id='canName'>{c.name}</div>
                                                        <div id='vote'>{(c.votes.length).toLocaleString()}</div>
                                                    </div>
                                                    ))
                                                }
                                            </div>
                                            
                                    </div>
                                );
                            })}

                        </div>
                    );
                })}
            </div>
  )
}

export default ElectionPollList
