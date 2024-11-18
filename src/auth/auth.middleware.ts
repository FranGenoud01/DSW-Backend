import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import PatientService from '../patient/patient.service.js';
import { Patient } from '../patient/patient.entity.js';
import { EntityManager } from '@mikro-orm/mysql';

interface CustomRequest extends Request {
  patient?: any; // Define la propiedad patient en la interfaz CustomRequest
}
export class AuthMiddleware {
  private readonly userService: PatientService;

  constructor(em: EntityManager) {
    this.userService = new PatientService(em);
  }

  authenticateToken(req: Request, res: Response, next: NextFunction) {
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
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async validateToken(decoded: jwt.JwtPayload): Promise<Patient | null> {
    try {
      const { DNI } = decoded;
      if (!DNI) {
        throw new Error('Invalid token');
      }
      const patient = await this.userService.findOneByDNI(DNI);
      return patient;
    } catch (error) {
      console.error('Error while validating token:', error);
      return null;
    }
  }
}
