import User from "../../src/models/v1/UserModel.js";
import { getUserInfo, getUserList } from "../../src/services/v1/UserService.js";

// Mocking the User model and bcrypt to isolate the function
jest.mock("../../src//models/v1/UserModel.js");
jest.mock("bcryptjs");

const mockUsers = [
    {
      _id: "1",
      name: "User 1",
      email: "test1@test.com",
      password: "hashedPassword",
      matchPassword: jest.fn().mockResolvedValue(true),
    },
    {
      _id: "2",
      name: "User 2",
      email: "test2@test.com",
      password: "hashedPassword",
      matchPassword: jest.fn().mockResolvedValue(true),
    },
    {
      _id: "3",
      name: "User 3",
      email: "test3@test.com",
      password: "hashedPassword",
      matchPassword: jest.fn().mockResolvedValue(true),
    },
  ];

describe("getUserList", () => {
  it("should return user list except authenticated user", async () => {

    const authUserId = "1"; // Assume the authenticated user has ID "1"

    // Mocking User.find with a query that supports .select chaining
    const mockSelect = jest.fn().mockResolvedValue(mockUsers.filter(({ _id }) => _id !== authUserId));
    User.find = jest.fn().mockReturnValue({ select: mockSelect });

    const users = await getUserList(authUserId);

    // except total user is 2
    expect(users.length).toBe(2);

    // ensure authenticated user is not exist in the result
    expect(users).toEqual(mockUsers.filter(({ _id }) => _id !== authUserId));

    // Verify that the find method was called with the correct query
    expect(User.find).toHaveBeenCalledWith({ _id: { $ne: authUserId } });

    // Verify that .select was called with the correct argument
    expect(User.find().select).toHaveBeenCalledWith("-password");
  });
});

describe("getUserInfo", () => {
  it("should return current user info", async () => {
    const authUserId = "1"; // Assume the authenticated user has ID "1"

    // Mocking User.findById with a query that supports .select chaining
    const mockSelect = jest.fn().mockResolvedValue(mockUsers.find(({ _id }) => _id === authUserId));
    User.findById = jest.fn().mockReturnValue({ select: mockSelect });

    const user = await getUserInfo(authUserId);

    // ensure result is matched with mock data
    expect(user).toEqual(mockUsers.find(({ _id }) => _id === authUserId));

    // Verify that the findById method was called with the correct query
    expect(User.findById).toHaveBeenCalledWith(authUserId);


    // Verify that .select was called with the correct argument
    expect(User.findById().select).toHaveBeenCalledWith("-password");
  });

  it("should throw user not found error if user not found", async () => {
    const userId = "5";
    // Mocking User.findById with a query that supports .select chaining
    const mockSelect = jest.fn().mockResolvedValue(mockUsers.find(({ _id }) => _id === userId));
    User.findById = jest.fn().mockReturnValue({ select: mockSelect });

    await expect(getUserInfo(userId)).rejects.toThrow("User not found");

    // Verify that the findById method was called with the correct query
    expect(User.findById).toHaveBeenCalledWith(userId);
  });
});
