import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.js";
import routes from "./src/routes/v1/index.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

// Load environment variable
dotenv.config();

// Middleware to parse JSON requests
const app = express();

app.use(express.json());
app.use(cors()); // To apply cross-site accessibility

// Connect to MongoDB
connectDB();

const API_VERSION = process.env.API_VERSION;

app.get("/", (_, res) => {
	res.json({ message: `Welcome to ${process.env.APP_NAME || "app"}.` });
});

app.use(`/api/${API_VERSION}`, routes);

// Catch all undefined routes and return 404
app.use("*", (_, res) => {
	res.status(404).json({ status: "error", message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on http://${HOST}:${PORT}`));