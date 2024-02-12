import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Patient } from '../patient/patient.entity.js';
import PatientService from '../patient/patient.service.js';

export class AuthService {
  private readonly userService: PatientService;
  constructor(userService: PatientService) {
    this.userService = userService;
  }
  async validateAuth(DNI: string, password: string): Promise<Patient | null> {
    const userByDNI = await this.userService.findOneByDNI(DNI);
    if (!userByDNI) {
      return null;
    }
    const passwordCorrect = await bcrypt.compare(password, userByDNI.password);
    if (!passwordCorrect) {
      return null;
    }
    return userByDNI;
  }

  sign(payload: jwt.JwtPayload, secret: any) {
    return jwt.sign(payload, secret);
  }

  async generateJWT(
    patient: Patient
  ): Promise<{ accessToken: string; patient: Patient }> {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Ejemplo: token expira en 1 día
    const payload = {
      DNI: patient.DNI,
      name: patient.name,
      surname: patient.surname,
      exp: expirationDate.getTime() / 1000,
    };
    return {
      accessToken: this.sign(payload, '123456'),
      patient,
    };
  }
}
