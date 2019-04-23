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

  handleVideo = (id,x,y,multiplier) => {
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
    // var widthX = x !== 0 ? merger.width * 2 : merger.width; 
    // widthX = y !== 0 ? merger.width * 2 : merger.width; 
    // var heightY= y !== 0 ? merger.height * 2 : merger.height; 
    // heightY= x !== 0 ? merger.height * 2 : merger.height

    merger.addMediaElement('aac', aacElement)
    merger.addMediaElement('mp4', mp4Element, {
      x: x,
      y: y,
      width: merger.width * multiplier,
      height: merger.height * multiplier,
      mute: false,
      draw: null,
    })

    //merger.start()
    const newVideo = {
      id: id,
      videoStreamMerger: merger
    }

    this.props.addVideo(newVideo)
    console.log(this.props)

    var outputElement = document.querySelector("#"+id)
    // outputElement.width = widthX
    // outputElement.height = heightY
    outputElement.srcObject = merger.result
    outputElement.autoplay = true
}

  componentDidMount(){
     //store.dispatch(loadConfig())
     const { configs } = this.props.config
     {configs && configs.map(config => {
       this.handleVideo(config.id,config.x, config.y, config.sizeMultiplier)
      })}
      console.log(this.props)
  }

  render() {
    const { configs } = this.props.config
    console.log(configs)
    return (
      <Provider store={store}>
        <div className="App">
          <button onClick={this.handleDelete}>Click to Start</button><br/>
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
