import OneToOneChat from "../../models/v1/OneToOneChatModel.js";

import asyncHandler from "../../utils/asyncHandler.js";
import { NotFoundError } from "../../utils/errors.js";
import successResponseHandler from "../../utils/successResponseHandler.js";

// Get all messages with an individual
export const getMessages = asyncHandler(async (req, res) => {
	const userId = req.user.id;
	const { friendId } = req.params;

	if (!friendId) {
		throw new NotFoundError("Invalid request.")
	}

	const messages = await OneToOneChat.find({
		$or: [
			{ senderId: userId, receiverId: friendId },  // Sent by user to friend
			{ senderId: friendId, receiverId: userId }   // Sent by friend to user
		]
	});

	successResponseHandler(res, messages, "Messages retrieved successfully");
});

// Save a new message
export const saveMessage = async (payload) => {
	try {
		// New message
		const message = new OneToOneChat(payload)

		await message.save();
		return message;
	} catch (e) {
		return null
	}
};
