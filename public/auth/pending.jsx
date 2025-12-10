import React from 'react'
import { MdLockClock } from "react-icons/md";

const Pending = () => {
  return (
    <div>
       <div className="statueCon">
            <span id="pendingIcon"><MdLockClock /></span>
            <div>
              <div class="sttx">
                <span id='statue'>Pending</span>
              </div>
              <p>Try logging in after 24hrs as we verify your details</p>
            </div>
        </div>
    </div>
  )
}

export default Pending
