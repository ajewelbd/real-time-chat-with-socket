import { Server as socketIo } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { UnAuthorizedError } from "../../utils/errors.js";
import { saveMessage } from "./ChatController.js";

const initSocketIo = (server) => {
	const users = {};
	const io = new socketIo(server, {
		cors: { origin: '*' }
	});

	io.use((socket, next) => {
		const token = socket.handshake.auth.token;
		if (!token) return next(new UnAuthorizedError());

		try {
			socket.user = jwt.verify(token, process.env.JWT_SECRET);
			users[socket.user.id] = socket.id
			next();
		} catch (error) {
			console.log(error)
			next(new UnAuthorizedError());
		}
	});

	io.on('connection', (socket) => {
		console.log('User connected:', socket.user.id);

		// Handle new chat message
		socket.on('new-message', async (message) => {
			const receiverSocketId = users[message.receiverId];

			const savedMessage = await saveMessage(message)

			if (receiverSocketId && savedMessage) {
				// Emit message to the specific recipient
				io.to(receiverSocketId).emit('private-message', savedMessage);
			}
		});

		// Private file message handling
		socket.on('fileMessage', async ({ fileUrl, receiverId }) => {
			console.log("new file message", fileUrl, receiverId)

			if (receiverId) {
				// Send file to a specific user
				io.to(receiverId).emit('private-message', fileMessage);
			}
		});

		// Disconnect event
		socket.on('disconnect', () => {
			console.log('User disconnected:', socket.user.id);
			delete users[socket.user.id]
		});
	});

}

export default initSocketIo;