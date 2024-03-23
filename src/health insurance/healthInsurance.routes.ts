import { Router, Request, Response } from 'express';
import {
  add,
  findOne,
  findall,
  remove,
  update,
} from './healthInsurance.controler.js';
import { orm } from '../shared/orm.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';
import HealthInsuranceService from './healthInsurance.service.js';

const entityManager = orm.em;
const authController = new HealthInsuranceService(entityManager);
const authMiddleare = new AuthMiddleware(entityManager);

export const healthInsuranceRouter = Router();

healthInsuranceRouter.get('/', (req: Request, res: Response) =>
  findall(req, res)
);
healthInsuranceRouter.get(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => findOne(req, res)
);
healthInsuranceRouter.post(
  '/',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => add(req, res)
);
healthInsuranceRouter.put(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => update(req, res)
);
healthInsuranceRouter.delete(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => remove(req, res)
);
