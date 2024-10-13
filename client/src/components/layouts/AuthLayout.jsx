import { useNavigate } from "react-router-dom";
import { removeFormStorage } from "../../utils/common";
import { ArrowRightStartOnRectangleIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useGlobalStateContext } from "../../providers/ContextProvider";

export default function Layout({ children }) {
    const { currentUser } = useGlobalStateContext();
    const navigate = useNavigate();

    const logout = () => {
        removeFormStorage("token");
        navigate("/login");
    }

    return (
        <>
            <div className="flex flex-col gap-y-11 items-center">
                <nav className="bg-gray-800 w-full">
                    <div className="mx-auto px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex gap-x-3 items-center flex-shrink-0">
                                <ChatBubbleLeftRightIcon className="w-8 h-8 text-white font-semibold" />
                                <h3 className="text-xl font-semibold text-white">Real Time Chat</h3>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button type="button" className="flex gap-x-3 items-center" onClick={logout}>
                                    <p className="text-sm text-white">Hi, {currentUser?.name}</p>
                                    <p className="text-sm text-white">|</p>
                                    <ArrowRightStartOnRectangleIcon className="w-6 h-6 text-white" />
                                    <span className="sr-only">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container px-5 lg:px-0 md:px-0">
                    {children}
                </div>
            </div>
        </>
    )
}