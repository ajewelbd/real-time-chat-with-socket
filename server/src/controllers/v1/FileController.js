import multer from "multer";
import fs from "fs";
import path from "path";
import { ValidationError } from "../../utils/errors.js";
import successResponseHandler from "../../utils/successResponseHandler.js";

// Set up multer for file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = './uploads/';
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, "chat_file_" + file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
	}
});

const FileStorage = multer({ storage });

export const saveFile = (req, res) => {
	const file = req.file;
	if (!file) {
		throw new ValidationError("No file uploaded");
	}
	const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
	successResponseHandler(res, { url: fileUrl }, "File uploaded successfully");
};

export default FileStorage;