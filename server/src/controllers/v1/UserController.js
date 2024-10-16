import { getUserInfo, getUserList } from "../../services/v1/UserService.js";

import asyncHandler from "../../utils/asyncHandler.js";
import successResponseHandler from "../../utils/successResponseHandler.js";

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
	const users = await getUserList(req.user.id);

	successResponseHandler(res, users, "Users retrieved successfully");
});

// Get a user details
export const getUser = asyncHandler(async (req, res) => {
	const user = await getUserInfo(req.user.id);

	successResponseHandler(res, user, "User details retrieved successfully");
});
