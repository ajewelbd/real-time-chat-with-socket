import { AcademicCapIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Friends({ currentUser, setSelectedFriend, selectedFriend, notifyFrom }) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notifiedFromUsers, setNotifiedFromUsers] = useState([])

    const getUsers = async () => {
        try {
            const { data } = await axiosInstance.get("user/list");
            setUsers(data.data);
            if (data.data.length) setSelectedFriend(data.data[0]);
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
    };

    const onFirendSelect = (user) => {
        setSelectedFriend(user)

        // if this friend's id exist on notifications list, then his id will be removed.
        if(notifiedFromUsers.includes(user._id)) {
            const filteredNotifiedFromUsers = notifiedFromUsers.filter(id => id !== user._id)
            saveNotifications(filteredNotifiedFromUsers)
        }
    }

    // save totifications to state and localstorage
    const saveNotifications = (users) => {
        setNotifiedFromUsers(users);
        localStorage.setItem("notification-status", JSON.stringify(users))
    }


    // on mount load persisted user ids from localstorage,
    // whose are sent messagess but not seen by user on current session.
    useEffect(() => {
        const persistedNotifications = localStorage.getItem("notification-status");
        if(persistedNotifications) {
            setNotifiedFromUsers(JSON.parse(persistedNotifications))
        }
    }, [])

    useEffect(()=> {
        if(notifyFrom && !notifiedFromUsers.includes(notifyFrom)) {
            saveNotifications([...notifiedFromUsers, notifyFrom])
        }
    }, [notifyFrom])

    useEffect(() => {
        if (currentUser) getUsers();
    }, [currentUser]);

    return (
        <div className="flex flex-col w-[400px] border-r border-r-gray-300">
            <div className="flex gap-x-3 items-center p-3 border-b border-b-gray-300">
                <AcademicCapIcon className="w-6 h-6" />
                <p>{currentUser?.name}</p>
            </div>
            {isLoading ? (
                <ArrowPathIcon className="w-6 h-6 animate-spin" />
            ) : (
                <div className="h-[490px] overflow-y-auto w-full">
                    {users.length ? users.map((user) => (
                        <div
                            key={user._id}
                            className={`flex gap-x-px items-center p-3 border-b border-b-gray-300 hover:bg-green-600 hover:text-white cursor-pointer ${selectedFriend._id === user._id ? "bg-green-500 text-white font-medium": "bg-white"}`}
                            onClick={() => onFirendSelect(user)}
                        >
                            {user.name}{notifiedFromUsers.includes(user._id) ? <div className="w-1.5 h-1.5 rounded-full bg-green-800 mb-3 animate-ping"></div> : null}
                        </div>
                    )): <div className="flex items-center justify-center h-full w-full animate-pulse"><h4 className="text-sm font-medium text-stone-700">Opps! No friend found!</h4></div>}
                </div>
            )}
        </div>
    );
}
