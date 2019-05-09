import *  as types from '../constants/ActionTypes'
import {addUser, messageReceived, populateUsersList, syncVideo,syncIT, getUser, syncUserVideo } from '../actions/wsActions'
import {updateVideo} from '../actions/videoActions'

const setupSocket = (dispatch, username) => {
	const socket = new WebSocket('ws://localhost:8081', 'echo-protocol');

	socket.onopen = () => {
		socket.send(JSON.stringify({
			type: types.ADD_USER,
			name: username
		}))
	}
	socket.onmessage = (event) => {
		const data = JSON.parse(event.data)
		switch (data.type) {
			case types.ADD_MESSAGE:
				console.log("yo" + data.author + data.message)
				dispatch(messageReceived(data.message, data.author))
				break
			case types.ADD_USER:
				dispatch(addUser(data.name))
				break
			case types.USERS_LIST:
				console.log(data.users)
				dispatch(populateUsersList(data.users))
				break
			case types.SYNC_VIDEO:
				console.log(event)
				console.log("syncvideo" + data.author + data.message, data.currentTime)
				dispatch(syncVideo(data.message, data.author, data.currentTime))
				break
			case types.SYNC_IT:
				console.log(event)
				console.log("syncit" + data.author + data.message, data.currentTime)
				dispatch(syncIT(data.message, data.author, data.currentTime))
				break
			case types.GET_USER:
				console.log(event)
				console.log("getUser" + data.name)
				dispatch(getUser(data.name))
				break
			case types.SYNC_USER_VIDEO:
				console.log(event)
				console.log("syncUserVideo" + data.ws + data.name, data.currentTime, data.merger)
				dispatch(syncUserVideo(data.ws, data.name, data.currentTime))
				break
			case types.UPDATE_VIDEO:
				console.log(event)
				console.log("addVideo" + data)
				//dispatch(addVideo(data.video))
				break
			default:
				break
		}
	}
	return socket
}

export default setupSocket
