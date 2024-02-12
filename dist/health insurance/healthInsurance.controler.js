import { orm } from '../shared/orm.js';
import HealthInsuranceService from './healthInsurance.service.js';
const entityManager = orm.em;
const healthInsuranceService = new HealthInsuranceService(entityManager);
function sanitizedHealthInsuranceInput(req, res, next) {
    req.body.sanitizedInput = {
        description: req.body.description,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findall(req, res) {
    try {
        const healthInsurances = await healthInsuranceService.findAllHealthInsurances();
        res
            .status(200)
            .json({ message: 'Found all health insurances', data: healthInsurances });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const healthInsurance = await healthInsuranceService.findOneHealthInsurance(id);
        if (!healthInsurance)
            return res.status(404).json({ message: 'Not found' });
        return res
            .status(200)
            .json({ message: 'Found health insurance', data: healthInsurance });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const healthInsurance = await healthInsuranceService.createHealthInsurance(req.body);
        res
            .status(201)
            .json({ message: 'Health insurance created', data: healthInsurance });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const healthInsuranceToUpdate = await healthInsuranceService.updateHealthInsurance(id, req.body);
        res.status(200).json({
            message: 'Health insurance updated',
            data: healthInsuranceToUpdate,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        await healthInsuranceService.removeHealthInsurance(id);
        res.status(200).json({ message: 'Health insurance removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizedHealthInsuranceInput, findall, findOne, add, update, remove };
//# sourceMappingURL=healthInsurance.controler.js.map