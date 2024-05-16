import { Router } from 'express';
import { add, findOne, findall, getProf, getProfByHealthInsurance, remove, update, } from './professional.controler.js';
import { orm } from '../shared/orm.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';
const entityManager = orm.em;
const authMiddleare = new AuthMiddleware(entityManager);
export const professionalRouter = Router();
professionalRouter.get('/', (req, res) => findall(req, res));
professionalRouter.get('/:id', (req, res) => findOne(req, res));
professionalRouter.post('/', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => add(req, res));
professionalRouter.get('/:id/speciality', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => getProf(req, res));
professionalRouter.get('/:id/healthInsurance', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => getProfByHealthInsurance(req, res));
professionalRouter.put('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => update(req, res));
professionalRouter.delete('/:id', (req, res, next) => authMiddleare.authenticateToken(req, res, next), (req, res) => remove(req, res));
//# sourceMappingURL=professional.route.js.map