import { doLogin, registerUser } from '../../src/services/v1/AuthService.js';
import User from '../../src/models/v1/UserModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../../src/utils/tokenHandler.js';

// Mocking the User model and bcrypt to isolate the function
jest.mock('../../src//models/v1/UserModel.js');
jest.mock('bcryptjs');

describe('register', () => {
    it('should register a new user successfully', async () => {
        const mockUser = { name: 'Test', email: 'test@test.com', password: 'hashedPassword' };

        // Mocking User.findOne to return null (no existing user)
        User.findOne.mockResolvedValue(null);

        // Mocking bcrypt.hash to return a hashed password
        bcrypt.hash.mockResolvedValue('hashedPassword');

        // Mocking User.save to return the new user
        User.prototype.save.mockResolvedValue(mockUser);

        const token = await registerUser('Test', 'test@test.com', '123456');

        // Check if the token is a string
        expect(typeof token).toBe('string');

        // Check if the token follows JWT structure (3 parts separated by dots)
        const jwtParts = token.split('.');
        expect(jwtParts).toHaveLength(3);
    });

    it('should throw an error if the user already exists', async () => {
        User.findOne.mockResolvedValue({ email: 'test@test.com' });

        await expect(registerUser('Test', 'test@test.com', '123456'))
            .rejects
            .toThrow('User already exist!.');
    });
});

describe('login', () => {
    it('should generate a token for a valid user', async () => {
        // Mock the scenario where the user is found and password matches
        const mockUser = {
          _id: 'userId',
          matchPassword: jest.fn().mockResolvedValue(true),  // Mocking the password match function
        };
        User.findOne.mockResolvedValue(mockUser);  // User is found
    
        // Mock token generation
        const token = generateToken('userId');
    
        // Call the doLogin function
        const result = await doLogin('test@example.com', '123456');
    
        // Ensure that the returned token matches
        expect(result).toBe(token);
      });

    it('should throw an error if credentials are wrong', async () => {
        // Mock the scenario where the user is found and password did not matches
        const mockUser = {
            matchPassword: jest.fn().mockResolvedValue(false),  // Mocking the password match function
            email: 'test@test.com'
        };
        
        User.findOne.mockResolvedValue(mockUser);  // User is found

        await expect(doLogin('test@test.com', '654321'))
            .rejects
            .toThrow('Invalid credentials');
    });
});
