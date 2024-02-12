import { Router, Request, Response } from 'express';
import {
  findOne,
  findall,
  remove,
  sanitizePatientInput,
  update,
} from './patient.controler.js';
import PatientService from './patient.service.js';
import { orm } from '../shared/orm.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';

const entityManager = orm.em;

const patientService = new PatientService(entityManager);
const authMiddleare = new AuthMiddleware(entityManager);
export const patientRouter = Router();

patientRouter.get(
  '/',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => findall(req, res)
);
patientRouter.get(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => findOne(req, res)
);
patientRouter.post('/', sanitizePatientInput, async (req, res) => {
  try {
    const newPatient = await patientService.registerPatient(req.body);
    res.status(201).json({ message: 'Patient created', data: newPatient });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
patientRouter.put(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => update(req, res)
);
patientRouter.delete(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => remove(req, res)
);
