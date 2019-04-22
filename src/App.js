import React, { Component } from 'react';
import mp4 from './matte2short.mp4'
import aac from './sample.aac'
import VideoStreamMerger from 'video-stream-merger'
import Video from './Video';

var configs = [
  {id: 'out1', x: 0, y: 0},
  {id: 'out2', x: 0, y: -150},
  {id: 'out3', x: 0, y: 150},
  // {id: 'out2', x: -150, y: -150},
  // {id: 'out3', x: 150, y: 150},
  // {id: 'out4', x: -150, y: 150},
  // {id: 'out5', x: 150, y: -150}
]


class App extends Component {s

  handleVideo = () => {
    // var merger = new VideoStreamMerger({
      
    // })

    // var mp4Element = document.createElement('video')
    // var aacElement = document.createElement('audio')

    // mp4Element.muted = true
    // mp4Element.autoplay = true
    // //mp4Element.repeat = true
    // mp4Element.src = mp4 
    // mp4Element.loop = true // playback after complete
    // mp4Element.msPlayToDisabled = false

    // aacElement.muted = true
    // aacElement.src = aac

    // aacElement.autoplay = true

    // merger.addMediaElement('aac', aacElement)
    // merger.addMediaElement('mp4', mp4Element, {
    //   x: 0,
    //   y: 0,
    //   mute: false,
    //   draw: null,
    // })

    // merger.start()

    
    // var vidTwo = new VideoStreamMerger({
      
    // })

    // var mp4Ele = document.createElement('video')
    // var aacElt = document.createElement('audio')
    // mp4Ele.muted = true
    // mp4Ele.autoplay = true
    // //mp4Element.repeat = true
    // mp4Ele.src = mp4 
    // mp4Ele.loop = true // playback after complete
    // mp4Ele.msPlayToDisabled = false

    // aacElt.muted = true
    // aacElt.src = aac

    // aacElt.autoplay = true

    // vidTwo.addMediaElement('aac', aacElt)
    // vidTwo.addMediaElement('mp4', mp4Ele, {
    //   x: 0,
    //   y: -150,
    //   mute: false,
    //   draw: null,
    // })

    // vidTwo.start()

    // var outputElement = document.querySelector('#output')
    // outputElement.srcObject = merger.result
    // outputElement.autoplay = true

    // var outputElementTwo = document.querySelector('#outputTwo')
    // outputElementTwo.srcObject = vidTwo.result
    // outputElementTwo.autoplay = true
  }

  handleVideo = (id,x,y) => {
    var merger = new VideoStreamMerger({
      
    })

    var mp4Element = document.createElement('video')
    var aacElement = document.createElement('audio')

    mp4Element.muted = true
    mp4Element.autoplay = true
    //mp4Element.repeat = true
    mp4Element.src = mp4 
    mp4Element.loop = true // playback after complete
    mp4Element.msPlayToDisabled = false

    aacElement.muted = true
    aacElement.src = aac

    aacElement.autoplay = true
    // var widthX = x < 0 ? x + 300 : 300; 
    // var heightY= y < 0 ? y + 300 : 300; 

    merger.addMediaElement('aac', aacElement)
    merger.addMediaElement('mp4', mp4Element, {
      x: x,
      y: y,
      // width: widthX,
      // height: heightY,
      mute: false,
      draw: null,
    })

    merger.start()

    var outputElement = document.querySelector("#"+id)
    // outputElement.width = widthX
    // outputElement.height = heightY
    outputElement.srcObject = merger.result
    outputElement.autoplay = true
}

  componentDidMount(){
    {configs && configs.map(config => {
      this.handleVideo(config.id,config.x, config.y)
     })}
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>Click to Start</button><br/>
        <div className="disabled">
            {/* <video controls id="output"></video> */}
          
            {/* <video controls id="outputTwo"></video> */}


            {configs && configs.map(config => {
                return (
                  <Video config={config} />
                )
              })}  
        </div>
      </div>
    );
  }
}

export default App;
