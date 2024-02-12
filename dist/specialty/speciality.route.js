import { Router } from 'express';
import { add, findOne, findall, remove, update, } from './speciality.controler.js';
import { orm } from '../shared/orm.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';
const entityManager = orm.em;
const authMiddleare = new AuthMiddleware(entityManager);
export const specialityRouter = Router();
specialityRouter.get('/', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => findall(req, res));
specialityRouter.get('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => findOne(req, res));
specialityRouter.post('/', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => add(req, res));
specialityRouter.put('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => update(req, res));
specialityRouter.delete('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => remove(req, res));
//# sourceMappingURL=speciality.route.js.map