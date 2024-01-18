import jwt from 'jsonwebtoken';

export const getDataFromToken = (req, res) => {
    try {
        const encToken = req.cookies.get('token') || '';
        if (!encToken) {
            throw new Error('Token not found in cookies');
        }

        const decodedToken = jwt.verify(encToken, 'employeedashboardjwttoken');
        return decodedToken;
    } catch (error) {
        throw new Error('Token verification failed: ' + error.message);
    }
};
