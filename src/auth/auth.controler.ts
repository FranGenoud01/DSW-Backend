import { Request, Response } from 'express';
import { AuthService } from './auth.services.js';
import { Patient } from '../patient/patient.entity.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {
    const { DNI, password } = req.body;
    try {
      const patient: Patient | null = await this.authService.validateAuth(
        DNI,
        password
      );
      if (!patient) {
        throw new Error('Invalid user or password');
      }
      const token = await this.authService.generateJWT(patient);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
