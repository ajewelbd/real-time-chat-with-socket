import express from "express";
import FileStorage, { saveFile } from "../../controllers/v1/FileController.js";

const router = express.Router();

router.post("/upload", FileStorage.single('file'), saveFile);

export default router;
