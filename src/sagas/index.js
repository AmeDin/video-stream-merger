import { takeEvery, all } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

const handleNewMessage = function* handleNewMessage(params) {
	yield takeEvery(types.ADD_MESSAGE, (action) => {
		console.log(action)
		action.author = params.username
		params.socket.send(JSON.stringify(action))
	})
}

// export default handleNewMessage

const handleSyncVideo = function* handleSyncVideo(params) {
	yield takeEvery(types.SYNC_VIDEO, (action) => {
		action.author = params.username
		params.socket.send(JSON.stringify(action))
	})
}

const handleGetUser = function* handleGetUser(params) {
	yield takeEvery(types.TRIGGER_GET_USER, (action) => {
		action.type = types.GET_USER
		action.name = params.username
		params.socket.send(JSON.stringify(action))
	})
}

export default function* rootSaga(params) {
	yield all([
		handleSyncVideo(params),
	  	handleNewMessage(params),
	  	handleGetUser(params)
	])
  }