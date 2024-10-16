import User from "../../models/v1/UserModel.js";
import { NotFoundError } from "../../utils/errors.js";

// Get all users
export const getUserList = async (authUserId) => {
	const users = await User.find({ _id: { $ne: authUserId } }).select("-password");
	return users;
};

// Get a user details
export const getUserInfo = async (user_id) => {
	const user = await User.findById(user_id).select("-password");

	if (!user) {
		throw new NotFoundError("User not found");
	}

	return user;
};
