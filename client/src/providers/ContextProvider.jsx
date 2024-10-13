import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const StateContext = createContext({
    currentUser: {
        _id: 0,
        name: "",
        email: "",
        timestamp: ""
    }
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const getAndSetUser = async () => {
        try {
            const { data } = await axiosInstance.get("user/details");
            setCurrentUser(data.data)
        } catch (e) { }
    }

    useEffect(() => {
        getAndSetUser()
    }, [])

    return (
        <StateContext.Provider value={{
            currentUser
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useGlobalStateContext = () => useContext(StateContext);