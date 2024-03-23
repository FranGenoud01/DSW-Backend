import { Router, Request, Response } from 'express';
import {
  cancel,
  findByDNI,
  findOne,
  findall,
  generateShiftMonthly,
  remove,
  removeByProf,
  update,
} from './shift.controler.js';
import { orm } from '../shared/orm.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';

const entityManager = orm.em;

const authMiddleare = new AuthMiddleware(entityManager);

export const shiftRouter = Router();

shiftRouter.get(
  '/',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => findall(req, res)
);
shiftRouter.get(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => findOne(req, res)
);
shiftRouter.get('/:dni/pat', (req: Request, res: Response) =>
  findByDNI(req, res)
);
shiftRouter.post(
  '/:id/professional',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => generateShiftMonthly(req, res)
);
shiftRouter.put(
  '/:id/:dni',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => update(req, res)
);
shiftRouter.put(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => cancel(req, res)
);
shiftRouter.delete(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => remove(req, res)
);
shiftRouter.delete(
  '/:lic/prof',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => removeByProf(req, res)
);
