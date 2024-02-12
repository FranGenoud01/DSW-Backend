import jwt from 'jsonwebtoken';
import PatientService from '../patient/patient.service.js';
export class AuthMiddleware {
    constructor(em) {
        this.userService = new PatientService(em);
    }
    authenticateToken(req, res, next) {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            return res
                .status(401)
                .json({ message: 'Encabezado de autorización no encontrado.' });
        }
        const token = authorization.split(' ')[1];
        if (token == null)
            return res.status(404).json({ message: 'Token no encontrado.' });
        try {
            const decodeToken = jwt.verify(token, '123456');
            if (!decodeToken) {
                return res.status(404).json({ message: 'Token no encontrado.' });
            }
            return next();
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async validateToken(decoded) {
        try {
            const { DNI } = decoded;
            if (!DNI) {
                throw new Error('Invalid token');
            }
            const patient = await this.userService.findOneByDNI(DNI);
            return patient;
        }
        catch (error) {
            console.error('Error while validating token:', error);
            return null;
        }
    }
}
//# sourceMappingURL=auth.middleware.js.map