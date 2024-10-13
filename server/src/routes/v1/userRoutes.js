import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { getUser, getUsers } from "../../controllers/v1/UserController.js";

const router = express.Router();

router.get("/details", authMiddleware, getUser);
router.get("/list", authMiddleware, getUsers);

export default router;
