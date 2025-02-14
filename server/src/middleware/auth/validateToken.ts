import { Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
    token: JwtPayload;
}

const getToken = (req: Request) => {
    // Get the Authorization header
    const authHeader = req.get('Authorization');

    // If the Authorization header exists and starts with 'Bearer ', return the token
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.replace('Bearer ', '');
    }

    // If no token is found, return null
    return null;
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the request
    const token = getToken(req);

    // If no token is found, return a 401 response
    if (!token) {
        return res.status(401).send('Token not found');
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        (req as CustomRequest).token = decodedToken;

        // If the token is valid, call the next middleware
        next();
    } catch (error) {
        // If the token is invalid, return a 401 response
        return res.status(401).send('Invalid token');
    }
}
