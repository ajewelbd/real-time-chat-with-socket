import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variable
dotenv.config();

// Middleware to parse JSON requests
const app = express();

app.use(express.json());
app.use(cors()); // To apply cross-site accessibility

app.get("/", (_, res) => {
	res.json({ message: `Welcome to ${process.env.APP_NAME || "app"}.` });
});

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on http://${HOST}:${PORT}`));