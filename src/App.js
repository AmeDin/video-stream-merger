import React, { Component } from 'react';
import store from './stores/store';
import { Provider } from 'react-redux';
import { loadConfig, deleteConfig } from './actions/configActions';
import { addVideo, getVideos } from './actions/videoActions';
import { connect } from 'react-redux' ;
import  PropTypes from 'prop-types';
import { AddMessage } from './container/AddMessage';
import { MessagesList } from './container/MessagesList';
import VideoC from './components/VideoC';

class App extends Component {

  static propTypes = {
    loadConfig: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired
  }

  componentDidMount(){
  }

  render() {
    console.log(this.props)
    return (
      <Provider store={store}>
        <div className="App">
          <AddMessage />
          <MessagesList />
          <VideoC />
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
