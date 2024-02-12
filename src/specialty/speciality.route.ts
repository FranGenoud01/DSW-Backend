import { Router, Response, Request } from 'express';
import {
  add,
  findOne,
  findall,
  remove,
  update,
} from './speciality.controler.js';
import { orm } from '../shared/orm.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';

const entityManager = orm.em;

const authMiddleare = new AuthMiddleware(entityManager);

export const specialityRouter = Router();

specialityRouter.get(
  '/',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => findall(req, res)
);
specialityRouter.get(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => findOne(req, res)
);
specialityRouter.post(
  '/',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => add(req, res)
);
specialityRouter.put(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => update(req, res)
);
specialityRouter.delete(
  '/:id',
  (req, res, next) => authMiddleare.authenticateToken(req, res, next),
  (req: Request, res: Response) => remove(req, res)
);
