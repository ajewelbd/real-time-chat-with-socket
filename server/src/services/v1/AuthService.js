import User from "../../models/v1/UserModel.js";
import { ValidationError } from "../../utils/errors.js";
import generateToken from "../../utils/tokenHandler.js";

// Register a User
export const registerUser = async (name, email, password) => {

  // Check if the user already exists
  let user = await User.findOne({ email });
  if (user) {
    throw new ValidationError("User already exist!.");
  }

  // Create user
  user = new User({ name, email, password});

  await user.save();

  // Generate JWT token
  const token = generateToken(user._id);
  return token;
};

// Check authenticity
export const doLogin = async (email, password) => {
  // Find the user by email
  let user = await User.findOne({ email });
  if (!user) {
    throw new ValidationError("Invalid credentials");
  }

  // Check if password matches
  let isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ValidationError("Invalid credentials");
  }

  // Generate JWT token
  const token = generateToken(user._id);
  return token;
};
