import { Router } from 'express';
import { add, findOne, findall, remove, update, } from './healthInsurance.controler.js';
import { orm } from '../shared/orm.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';
const entityManager = orm.em;
const authMiddleare = new AuthMiddleware(entityManager);
export const healthInsuranceRouter = Router();
healthInsuranceRouter.get('/', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => findall(req, res));
healthInsuranceRouter.get('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => findOne(req, res));
healthInsuranceRouter.post('/', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => add(req, res));
healthInsuranceRouter.put('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => update(req, res));
healthInsuranceRouter.delete('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => remove(req, res));
//# sourceMappingURL=healthInsurance.routes.js.map