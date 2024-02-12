import { Router, Request, Response } from 'express';
import { orm } from '../shared/orm.js';
import PatientService from '../patient/patient.service.js';
import { AuthService } from './auth.services.js';
import { AuthController } from './auth.controler.js';

const entityManager = orm.em;
const userService = new PatientService(entityManager);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

export const authRouter = Router();

authRouter.post('/login', (req, res) => authController.login(req, res));
