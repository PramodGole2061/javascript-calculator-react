import React from 'react'

export default function Display(props) {
    const{display, expression} = props;
  return (
      <div className='text-end px-2'>
          <div style={{minHeight: "1.5em",fontFamily:"digital", fontSize: "1.5rem", color: "#fba33eff" }}>{expression}</div>
          <div id="display" className='my-0' style={{fontFamily: "digital", fontSize: "2rem", color:" #f8f7f5ff" }}>{display}</div>
      </div>
  )
}
