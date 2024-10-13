// General error
class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}

// Specific erroors

class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404);
	}
}

class UnAuthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}

class ValidationError extends AppError {
	constructor(message = "Invalid input") {
		super(message, 400);
	}
}

export { AppError, NotFoundError, UnAuthorizedError, ValidationError };
