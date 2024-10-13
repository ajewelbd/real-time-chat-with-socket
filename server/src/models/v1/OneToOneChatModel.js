import mongoose from "mongoose";
import ChatContentTypes from "../../enums/ChatContentTypes.js"

const ChatSchema = new mongoose.Schema({
	senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	content: String,
	type: {
		type: String,
		enum: Object.values(ChatContentTypes)
	},
	timestamp: { type: Date, default: Date.now }
})

export default mongoose.model("OneToOneChat", ChatSchema);
