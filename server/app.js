const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 })

const users = []

const broadcast = (data, ws) => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN && client !== ws ) { 
			client.send(JSON.stringify(data))
		}
	})
}

wss.on('connection', (ws) => {
	let index
	ws.on('message', (message) => {
		const data = JSON.parse(message)
		console.log(data)
		switch (data.type) {
			case 'ADD_USER': {
				index = users.length
				users.push({ name: data.name, ws: ws, id: index + 1, currentTime: 0})
				ws.send(JSON.stringify({
					type: 'USERS_LIST',
					users
				}))
				broadcast({
					type: 'USERS_LIST',
					users
				}, ws)
				break
			}
			case 'ADD_MESSAGE':
				broadcast({
					type: 'ADD_MESSAGE',
					message: data.message,
					author: data.author
				}, ws)
				break
			case 'SYNC_VIDEO':
				for(i = 0; i < users.length; i++){ 
					if(users[i].name == data.author) {
						users[i].currentTime  = data.currentTime
						break;
					}
				}
				ws.send(JSON.stringify({
					type: 'SYNC_USER_VIDEO',
					ws: ws,
					name: data.author,
					currentTime: data.currentTime
				}))
				broadcast({
					type: 'SYNC_USER_VIDEO',
					ws: ws,
					name: data.author,
					currentTime: data.currentTime
				}, ws)
				break
			case 'SYNC_IT':
				for(i = 0; i < users.length; i++){ 
					if(users[i].name == data.author) {
						users[i].currentTime  = data.currentTime
						break;
					}
				}
				ws.send(JSON.stringify({
					type: 'SYNC_IT',
					message: data.message,
					author: data.author,
					currentTime: data.currentTime
				}))
				break
			case 'GET_USER': 
				name = ""
				for(i = 0; i < users.length; i++){ 
					if(users[i].ws == ws) {
						name = users[i].name
						break;
					}
				}
				ws.send(JSON.stringify({
					type: 'GET_USER',
					name: name
				}))
				break
			default:
				break
		}
	})

	ws.on('close', () => {
		users.splice(index, 1)
		broadcast({
			type: 'USERS_LIST',
			users
		}, ws)
	})
})