import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { UnAuthorizedError } from "../utils/errors.js";

const authMiddleware = (req, res, next) => {
    const token = req.header("authorization");

    if(!token) {
        throw new UnAuthorizedError();
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch(error) {
        throw new UnAuthorizedError("Token is not valid");
    }
}

export default authMiddleware;