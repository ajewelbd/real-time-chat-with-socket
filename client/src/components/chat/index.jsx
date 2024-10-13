import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatBox from "./ChatBox";
import Friends from "./Friends";
import { useGlobalStateContext } from "../../providers/ContextProvider";
import { API_BASE_URL } from "../../utils/constants";
import { getToken } from "../../utils/common";

export default function Chat() {
    const { currentUser } = useGlobalStateContext();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [socket, setSocket] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const token = getToken();
        if (token) {
            setSocket(io(API_BASE_URL, { auth: { token } }));
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("private-message", (message) => {
                if (message.receiverId === currentUser?._id) {
                    setNewMessage(message);
                }
            });
        }
    }, [socket]);

    return currentUser ? (
        <div className="flex items-start w-full border border-gray-300 rounded">
            <Friends
                currentUser={currentUser}
                setSelectedFriend={setSelectedFriend}
            />
            <ChatBox
                currentUser={currentUser}
                selectedFriend={selectedFriend}
                socket={socket}
                newMessage={newMessage}
            />
        </div>
    ) : null;
}
