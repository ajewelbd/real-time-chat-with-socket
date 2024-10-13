import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../auth/AuthGuard";
import Register from "../auth/Register";
import Login from "../auth/Login";

const routes = [
    {
        path: "/",
        element: <AuthGuard></AuthGuard>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
]

const router = createBrowserRouter(routes)

export default router;