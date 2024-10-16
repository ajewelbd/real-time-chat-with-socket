import OneToOneChat from "../../models/v1/OneToOneChatModel.js";
import UserModel from "../../models/v1/UserModel.js";
import { NotFoundError } from "../../utils/errors.js";

// Get all messages with an individual
export const getMessageList = async (userId, friendId) => {
	const user = await UserModel.findById(friendId).select("-password");

	if (!user) {
		throw new NotFoundError("User not found!")
	}

	const messages = await OneToOneChat.find({
		$or: [
			{ senderId: userId, receiverId: friendId },  // Sent by user to friend
			{ senderId: friendId, receiverId: userId }   // Sent by friend to user
		]
	});

	return messages;
};

// Save a new message
export const insertMessage = async (payload) => {
	const message = new OneToOneChat(payload)
	await message.save();
	
	return message;
};
