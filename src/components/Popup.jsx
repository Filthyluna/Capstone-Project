import React from 'react'
import './Popup.css'  
import './BookList'
function Popup(props){
return(props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}
        ><img src="https://cdn-icons-png.flaticon.com/24/4421/4421536.png" /></button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default Popup
