import { Router } from 'express';
import { cancel, findByDNI, findOne, findall, generateShiftMonthly, remove, removeByProf, update, } from './shift.controler.js';
import { orm } from '../shared/orm.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';
const entityManager = orm.em;
const authMiddleare = new AuthMiddleware(entityManager);
export const shiftRouter = Router();
shiftRouter.get('/', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => findall(req, res));
shiftRouter.get('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => findOne(req, res));
shiftRouter.get('/:dni/pat', (req, res) => findByDNI(req, res));
shiftRouter.post('/:id/professional', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => generateShiftMonthly(req, res));
shiftRouter.put('/:id/:dni', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => update(req, res));
shiftRouter.put('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => cancel(req, res));
shiftRouter.delete('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => remove(req, res));
shiftRouter.delete('/:lic/prof', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => removeByProf(req, res));
//# sourceMappingURL=shift.route.js.map