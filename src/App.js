import React, { Component } from 'react';
import mp4 from './matte2short.mp4'
import aac from './sample.aac'
import VideoStreamMerger from 'video-stream-merger'
import Video from './Video';
import store from './stores/store';
import { Provider } from 'react-redux';
import { loadConfig, deleteConfig } from './actions/configActions';
import { addVideo, getVideos } from './actions/videoActions';
import { connect } from 'react-redux' ;
import  PropTypes from 'prop-types';
import { AddMessage } from './container/AddMessage';
import { MessagesList } from './container/MessagesList';

// var configs = [
//   {id: 'out1', x: 0, y: 0, sizeMultiplier: 2, float:'floatleft'},
//   {id: 'out2', x: -400, y: 0, sizeMultiplier: 2, float:'floatright'},
//   // {id: 'outMid', x: 0, y: 0, sizeMultiplier: 1, float:'floatleft'},
//   {id: 'out3', x: 0, y: -304, sizeMultiplier: 2, float:'floatleft'},
//   {id: 'out4', x: -400, y: -304, sizeMultiplier: 2, float:'floatright'},
//   // {id: 'out2', x: -150, y: -150},
//   // {id: 'out3', x: 150, y: 150},
//   // {id: 'out4', x: -150, y: 150},
//   // {id: 'out5', x: 150, y: -150}
// ]


class App extends Component {

  static propTypes = {
    loadConfig: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired
  }

  handleDelete = (e) => {
    this.props.deleteConfig(1)
    console.log(this.props)
  }

  handleStart= (e) => {
    const { videos } = this.props.video
    for (const video of videos) {
      video.videoStreamMerger.start()
      var outputElement = document.querySelector("#"+video.id)
      outputElement.srcObject = video.videoStreamMerger.result
      outputElement.autoplay = true
    }
    console.log(this.props)
  }

  handleVideo = async (id,x,y,multiplier) => {
    var merger = new VideoStreamMerger({
      
    })

    var mp4Element = document.createElement('video')
    var aacElement = document.createElement('audio')

    mp4Element.muted = true
    mp4Element.autoplay = true
    //mp4Element.play()
    //mp4Element.repeat = true
    mp4Element.src = mp4 
    mp4Element.loop = true // playback after complete
    mp4Element.msPlayToDisabled = false

    Object.defineProperty(mp4Element, 'playing', {
      get: function(){
          return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
      }
    })

    if(mp4Element.playing === false)  {
      await mp4Element.play()
    }

    aacElement.muted = true
    aacElement.src = aac

    aacElement.autoplay = true
    // var widthX = x !== 0 ? merger.width * 2 : merger.width; 
    // widthX = y !== 0 ? merger.width * 2 : merger.width; 
    // var heightY= y !== 0 ? merger.height * 2 : merger.height; 
    // heightY= x !== 0 ? merger.height * 2 : merger.height

    const centralVideo = {
      x: merger.width * 1/3,
      y: merger.height * 1/3,
      height: merger.height*1/3,
      width: merger.width*1/3
    }
    // define what size you want your 4 cut-up videos to be and where
    const otherVideos = {
      width: merger.width * 1/3,
      height: merger.height * 1/3,
      x: [0, merger.width - merger.width * 1/3], // x coordinates of both columns
      y: [0, merger.height - merger.height * 1/2] // y coordinates of both rows
    }

    //merger.addMediaElement('aac', aacElement)
    merger.addMediaElement('mp4', mp4Element, {
      x: x,
      y: y,
      width: merger.width * multiplier,
      height: merger.height * multiplier,
      mute: false,
      draw: function (ctx, frame, done) { // <- custom draw function
        if (!frame.videoWidth) return done() // <- need to wait for video element to load
    
        // draw the full frame in the center (easy part)
        ctx.drawImage(frame, centralVideo.x, centralVideo.y, centralVideo.width, centralVideo.height)
    
        // draw the cut-up parts in each corner
        otherVideos.x.forEach((colX, i) => { // loop over columns
          otherVideos.y.forEach((rowY, j) => { // loop over rows
            // this defines what part of the frame you're drawing
            const [sx, sy, sWidth, sHeight] = [i*frame.videoWidth/2, j*frame.videoHeight/2, frame.videoWidth/2, frame.videoHeight/2]
    
             // this defines where you're drawing that part
            const [dx, dy, dWidth, dHeight] = [colX, rowY, otherVideos.width, otherVideos.height]
            ctx.drawImage(frame, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
          })
        })
        done()
      }
    })

    //merger.start()
    const newVideo = {
      id: id,
      videoStreamMerger: merger,
      mp4: mp4Element
    }

    this.props.addVideo(newVideo)
    console.log(this.props)

    // var outputElement = document.querySelector("#"+id)
    // // outputElement.width = widthX
    // // outputElement.height = heightY
    // outputElement.srcObject = merger.result
    // outputElement.autoplay = true
}

  componentDidMount(){
     //store.dispatch(loadConfig())
     const { configs } = this.props.config
      for (const config of configs) {
       this.handleVideo(config.id,config.x, config.y, config.sizeMultiplier)
      }
      console.log(this.props)
  }

  render() {
    const { configs } = this.props.config
    console.log(configs)
    return (
      <Provider store={store}>
        <div className="App">
          <AddMessage />
          <MessagesList />
          <button onClick={this.handleDelete}>Click to Delete</button><br/>
          <button onClick={this.handleStart}>Click to Start</button><br/>
          <div className="disabled">
              {/* <video controls id="output"></video> */}
            
              {/* <video controls id="outputTwo"></video> */}


              {configs && configs.map(config => {
                  return (
                    <Video config={config} key={config.id}/>
                  )
                })}  
          </div>
        </div>
      </Provider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVideo: (video) => dispatch(addVideo(video)),
    loadConfig: () => dispatch(loadConfig()),
    getVideos: () => dispatch(getVideos()),
    deleteConfig: (id) => dispatch(deleteConfig(id))
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
  video: state.video
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
