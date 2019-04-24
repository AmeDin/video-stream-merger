import React from 'react'
const Video = ({config}) => {

  return (
    <div className={config.float} >
      <video controls id={config.id} style={{width: '800px'}}></video>
    </div>
  )
}

export default Video

