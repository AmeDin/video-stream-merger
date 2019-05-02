import { connect } from 'react-redux'
import SyncVideoComponent from '../components/SyncVideo'
import { syncVideo } from '../actions/wsActions'

const mapDispatchToProps = dispatch => ({
  dispatch: (message, author) => {
    dispatch(syncVideo(message, author))
  }
})

export const SyncVideo = connect(() => ({}), mapDispatchToProps)(SyncVideoComponent)