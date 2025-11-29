import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, res: any, next: any) => {
    // 1. Check for the standard 'authorization' header (used by the Angular interceptor)
    let token = req.headers.authorization as string;

    // Check if the token exists and starts with the 'Bearer ' scheme
    if (token && token.startsWith('Bearer ')) {
        // Strip the 'Bearer ' prefix (7 characters long)
        token = token.substring(7);
    } else {
        // Fallback: Check for the legacy 'access_token' header, just in case
        token = req.headers.access_token as string;
    }

    // If no valid token found in either location, fail the request
    if (!token) return res.status(HTTP_UNAUTHORIZED).send();

    try {
        // Verify the token
        const decodedUser = verify(token, process.env.JWT_SECRET!);
        req.user = decodedUser;
    } catch (error) {
        // If token verification fails (e.g., expired, corrupted), return unauthorized
        res.status(HTTP_UNAUTHORIZED).send();
        return; // Important: stop execution after sending the response
    }

    // Token is valid, proceed to the route handler
    return next();
}