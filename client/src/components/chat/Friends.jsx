import { AcademicCapIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Friends({ currentUser, setSelectedFriend }) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUsers = async () => {
        try {
            const { data } = await axiosInstance.get("user/list");
            const users = data.data.filter(({ _id }) => _id !== currentUser?._id);
            setUsers(users);
            if (users.length) setSelectedFriend(users[0]);
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
    };

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
                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="p-3 border-b border-b-gray-300 hover:bg-green-500 hover:text-white cursor-pointer"
                            onClick={() => setSelectedFriend(user)}
                        >
                            {user.name || "Not found"}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
