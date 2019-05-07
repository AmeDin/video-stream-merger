import * as types from '../../constants/ActionTypes'

const users = (state = [], action) => {
	switch (action.type) {
		case types.ADD_USER:
		console.log(state)
			return state.concat([
					{ name: action.name, id: action.id }
				])
		case types.USERS_LIST:
			console.log(state)
			return action.users
		case types.GET_USER:
			return state.find(user => user.name === action.name)
		case types.SYNC_USER_VIDEO:
			return state.map(user => user ? {...user, currentTime: action.currentTime} :  {...user, currentTime: action.currentTime})
			//return state.map(user => user.name === action.name ? {...user, currentTime: action.currentTime} : user )
		case types.TRIGGER_GET_USER:
		default:
			return state
	}
}

export default users