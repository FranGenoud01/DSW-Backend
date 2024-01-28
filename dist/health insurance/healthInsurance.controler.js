import { orm } from "../shared/orm.js";
import { HealthInsurance } from "./healthInsurance.entity.js";
const entityManager = orm.em;
function sanitizedHealthInsuranceInput(req, res, next) {
    req.body.sanitizedInput = {
        description: req.body.description
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
        const healthInsurances = await entityManager.find(HealthInsurance, {});
        res.status(200).json({ message: 'found all health insurances', data: healthInsurances });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const healthInsurance = await entityManager.findOneOrFail(HealthInsurance, { id });
        res.status(200).json({ message: 'found health insurance', data: healthInsurance });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const healthInsurance = entityManager.create(HealthInsurance, req.body.sanitizedInput);
        await entityManager.flush();
        res.status(201).json({ message: 'Health insurance created', data: healthInsurance });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const healthInsuranceToUpdate = await entityManager.findOneOrFail(HealthInsurance, { id });
        entityManager.assign(healthInsuranceToUpdate, req.body.sanitizedInput);
        await entityManager.flush();
        res.status(200).json({ message: 'Health insurance updated', data: healthInsuranceToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const healthInsurance = await entityManager.findOne(HealthInsurance, { id });
        if (!healthInsurance) {
            return res.status(404).json({ message: 'Health insurance not found' });
        }
        await entityManager.removeAndFlush(healthInsurance);
        res.status(200).json({ message: 'Health insurance removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizedHealthInsuranceInput, findall, findOne, add, update, remove };
//# sourceMappingURL=healthInsurance.controler.js.map