import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import FileStorage, { saveFile } from "../../controllers/v1/FileController.js";

const router = express.Router();

router.post("/upload", authMiddleware, FileStorage.single('file'), saveFile);

export default router;
