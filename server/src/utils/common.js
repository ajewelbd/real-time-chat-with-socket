import fs from "fs";

// Function to format the date as YYYY-MM-DD
export const formatDate = (pubDate) => {
	try {
		const date = new Date(pubDate);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
		const day = String(date.getDate()).padStart(2, "0"); // Pad single digits with 0
		return `${year}-${month}-${day}`;
	} catch (e) {
		return "";
	}
};

export const readJsonFileSync = (filePath) => {
	try {
		const data = fs.readFileSync(filePath, "utf-8"); // Read file synchronously
		const jsonData = JSON.parse(data); // Parse JSON data
		return jsonData;
	} catch (error) {
		console.error("Error reading JSON file:", error);
		return null;
	}
};
