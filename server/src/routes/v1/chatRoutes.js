import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { getMessages } from "../../controllers/v1/ChatController.js";

const router = express.Router();

router.get("/messages/:friendId", authMiddleware, getMessages);

export default router;
