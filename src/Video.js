import React from 'react'
const Video = ({config}) => {

  return (
    <div className={config.float}  >
      <video controls id={config.id}></video>
    </div>
  )
}

export default Video

