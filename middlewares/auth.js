import jwt from 'jsonwebtoken';
import { CONFIGURATION } from '../utility/const.js';


/***
 * this function checks whether token is vaild or not.
 * */
export function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, CONFIGURATION.KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};