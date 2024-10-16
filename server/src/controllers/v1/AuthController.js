import { doLogin, registerUser } from "../../services/v1/AuthService.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ValidationError } from "../../utils/errors.js";
import successResponseHandler from "../../utils/successResponseHandler.js";

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

	const token = await registerUser(name, email, password,);
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

	const token = await doLogin(email, password);
	successResponseHandler(res, { token }, "Authentication sucessfull.");
});
