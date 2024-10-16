import User from "../../models/v1/UserModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ValidationError } from "../../utils/errors.js";
import successResponseHandler from "../../utils/successResponseHandler.js";
import generateToken from "../../utils/tokenHandler.js";

// Register a User
export const register = asyncHandler(async (req, res) => {
	const {
		name,
		email,
		password,
	} = req.body;

	if (!name || !email || !password) {
		throw new ValidationError();
	}

	// Check if the user already exists
	let user = await User.findOne({ email });
	if (user) {
		throw new ValidationError("User already exist!.")
	}

	// Create user
	user = new User({
		name,
		email,
		password
	})

	await user.save();

	// Generate JWT token
	const token = generateToken(user._id);
	successResponseHandler(res, { token }, "User successfully registered", 201);
});

// Check authenticity
export const login = asyncHandler(async (req, res) => {
	const {
		email,
		password,
	} = req.body;

	if (!email || !password) {
		throw new ValidationError();
	}

	// Find the user by email
	let user = await User.findOne({ email });
	if (!user) {
		throw new ValidationError("Invalid credentials")
	}

	// Check if password matches
	let isMatch = await user.matchPassword(password);
	if (!isMatch) {
		throw new ValidationError("Invalid credentials")
	}

	// Generate JWT token
	const token = generateToken(user._id);
	successResponseHandler(res, { token }, "Authentication sucessfull.");
});
