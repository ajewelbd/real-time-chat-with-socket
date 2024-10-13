import {
    ArrowPathIcon,
    CubeIcon,
    PaperAirplaneIcon,
    PaperClipIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../utils/constants";
import FileHandler from "./FileHandler";

export default function ChatBox({ currentUser, selectedFriend, socket, newMessage }) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [text, setText] = useState("");
    const messageContainerEndRef = useRef(null);

    const getMessages = async () => {
        try {
            const { data } = await axiosInstance.get(
                `chat/messages/${selectedFriend._id}`
            );
            setMessages(data.data);
            scrollToBottom()
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
    };

    const sendMessage = () => {
        if (isSending) return;

        setIsSending(true);
        try {
            if (text) {
                emitMessage(text)
                setText("")
            }
        } catch (e) { }

        setIsSending(false);
    };

    const emitMessage = (content = "", type = "text") => {
        const message = {
            senderId: currentUser._id,
            receiverId: selectedFriend._id,
            content,
            type,
        }
        socket.emit("new-message", message);
        addMessage(message)
    }

    const addMessage = (message) => {
        setMessages((prev) => ([...prev, message]))
        scrollToBottom()
    }

    // Scroll to the bottom of the message list
    const scrollToBottom = () => {
        if (messageContainerEndRef.current) {
            setTimeout(() => messageContainerEndRef.current.scrollIntoView({ behavior: 'smooth' }))
        }
    };

    // Handle file upload
    const handleFileUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        try {
            const { data } = await axiosInstance.post(`${API_URL}file/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const fileUrl = data.data.url;

            emitMessage(fileUrl, "file")
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    useEffect(() => {
        if (selectedFriend) getMessages();
    }, [selectedFriend]);

    useEffect(() => {
        if (newMessage) {
            addMessage(newMessage)
        }
    }, [newMessage]);

    return (
        <div className="flex flex-col w-full">
            <div className="flex gap-x-3 items-center p-3 border-b border-b-gray-300">
                <CubeIcon className="w-6 h-6" />
                <p>{selectedFriend?.name}</p>
            </div>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center w-full h-[490px]">
                    <ArrowPathIcon className="w-11 h-11 animate-spin" />{" "}
                    <h4 className="text-base font-medium text-stone-700 animate-pulse">
                        Loading...
                    </h4>
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex flex-col gap-y-1.5 h-[450px] overflow-y-auto w-full px-3">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-center w-full ${message.senderId === currentUser._id ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    key={index}
                                    className={`flex items-center w-fit max-w-[80%] p-3 text- shadow-md ${message.senderId === currentUser._id ? "bg-blue-300 rounded-l-md" : "bg-indigo-300 rounded-r-md"}`}
                                >
                                    {message.type === "file" ? <FileHandler url={message.content} /> : message.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messageContainerEndRef}></div>
                    </div>
                    <div className="flex items-center border-t border-t-gray-300">
                        <input
                            type="text"
                            name="message"
                            className="w-full border-0 h-[39px] focus:outline-none focus:offset-0 px-2.5"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div className="flex gap-x-3 items-center justify-between w-24 border-l border-l-gray-300 px-2.5" >
                            <div className="cursor-pointer">
                                <input type="file" id="file" onChange={handleFileUpload} hidden />
                                <label htmlFor="file">
                                    <PaperClipIcon className="w-5 h-5" />
                                </label>
                            </div>
                            {isSending ? (
                                <ArrowPathIcon className="w-11 h-11 animate-spin" />
                            ) : (
                                <button
                                    className="text-blue-500 disabled:text-gray-300"
                                    onClick={sendMessage}
                                    disabled={!text}
                                >
                                    <PaperAirplaneIcon className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
