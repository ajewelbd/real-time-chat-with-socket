import { Navigate } from "react-router-dom";
import { isAutenticated } from "../utils/common";
import AuthLayout from "../components/layouts/AuthLayout";
import { ContextProvider } from "../providers/ContextProvider";
import Chat from "../components/chat";

export default function AuthGuard() {
    if (!isAutenticated()) return <Navigate to="/login" />

    return (
        <ContextProvider>
            <AuthLayout><Chat /></AuthLayout>
        </ContextProvider>
    )
}