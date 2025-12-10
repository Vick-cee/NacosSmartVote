import React from 'react'
import { FaUserSlash } from 'react-icons/fa'
const VerifyList = ({pending, grantAccess}) => {
  return (
    <div className='mainGridCon'>
        <div className='mainGrid'>
            <div className="gridCol">
                <span>s/n</span>
                <span>name</span>
                <span>email</span>
                <span>matric</span>
                <span>action</span>
            </div>
            
            <div className="profileCon"> 
            {
                pending.length > 0 ? pending.map((user, index) => {
                    return (
                        <div className="profile" key={index}>
                            <span id="index">{index + 1}.</span>
                            <span> {user.username} </span>
                            <span id="email">{user.email}</span>
                            <span>{user.matric === null? 'No issued matric': user.matric}</span>

                            <div className="actConbtn">
                                <button id="deny"
                                    onClick={() => denyAccess(user._id, user.username, user.email)}
                                >  
                                    Deny 
                                </button>
                                <button id="approve"
                                    onClick={() => grantAccess(user._id, user.username, user.email)}
                                > 
                                    Approve 
                                </button>
                            </div>

                        </div>
                    )
                })  : <div className="emptyListCon"> <div id="emptyList"> <FaUserSlash />  </div> <span>could not find pending user</span> </div>
            }
            </div>
            
        </div>
    </div>

  )
}

export default VerifyList
