import User from "../../models/v1/UserModel.js";

import asyncHandler from "../../utils/asyncHandler.js";
import { NotFoundError } from "../../utils/errors.js";
import successResponseHandler from "../../utils/successResponseHandler.js";

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password");

	successResponseHandler(res, users, "Users retrieved successfully");
});

// Get a user details
export const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id).select("-password");
	if (!user) {
		throw new NotFoundError("User not found");
	}

	successResponseHandler(res, user, "User details retrieved successfully");
});
