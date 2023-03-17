const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	socket.on('message', (data) => {
		socket.broadcast.emit('receive', data);
	});

	socket.on('change_status', (status) => {
		socket.broadcast.emit('receive', {
			message: `Пользователь сменил статус на: ${status}`,
		});
	});
});

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
