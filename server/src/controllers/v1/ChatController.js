import { getMessageList, insertMessage } from "../../services/v1/ChatService.js";
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

	const messages = await getMessageList(userId, friendId);

	successResponseHandler(res, messages, "Messages retrieved successfully");
});

// Save a new message
export const saveMessage = async (payload) => {
	try {
		const message = await insertMessage(payload)
		return message;
	} catch (e) {
		return null
	}
};
