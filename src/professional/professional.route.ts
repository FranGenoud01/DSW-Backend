import { Router, Request, Response } from 'express';
import {
  add,
  findOne,
  findall,
  getProf,
  getProfByHealthInsurance,
  remove,
  update,
} from './professional.controler.js';
import { orm } from '../shared/orm.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';

const entityManager = orm.em;

const authMiddleare = new AuthMiddleware(entityManager);
export const professionalRouter = Router();

professionalRouter.get('/', (req: Request, res: Response) => findall(req, res));
professionalRouter.get('/:id', (req: Request, res: Response) =>
  findOne(req, res)
);
professionalRouter.post(
  '/',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => add(req, res)
);
professionalRouter.get(
  '/:id/speciality',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => getProf(req, res)
);
professionalRouter.get(
  '/:id/healthInsurance',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => getProfByHealthInsurance(req, res)
);
professionalRouter.put(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => update(req, res)
);
professionalRouter.delete(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => remove(req, res)
);
