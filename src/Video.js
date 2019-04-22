import React from 'react'
const Video = ({config}) => {

  return (
    <div className="card z-depth-0 project-summary float" >
      <video controls id={config.id}></video>
    </div>
  )
}

export default Video

