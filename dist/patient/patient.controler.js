import { Patient } from "./patient.entity.js";
import { orm } from "../shared/orm.js";
const entityManager = orm.em;
function sanitizePatientInput(req, res, next) {
    req.body.sanitizedInput = {
        DNI: req.body.DNI,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        birthdate: req.body.birthdate,
        healthInsurance: req.body.healthInsurance,
        adress: req.body.adress,
        phoneNumber: req.body.phoneNumber,
        sex: req.body.sex,
        email: req.body.email,
        password: req.body.password
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] == undefined)
            delete req.body.sanitizedInput[key];
    });
    next();
}
async function findall(req, res) {
    try {
        const patients = await entityManager.find(Patient, {}, { populate: ['healthInsurance'] });
        res.status(200).json({ message: 'found all patients', data: patients });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const DNI = req.params.id;
        const patient = await entityManager.findOneOrFail(Patient, { DNI }, { populate: ['healthInsurance'] });
        res.status(200).json({ message: 'found patient', data: patient });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const patient = entityManager.create(Patient, req.body.sanitizedInput);
        await entityManager.flush();
        res.status(201).json({ message: 'patient created', data: patient });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const DNI = req.params.id;
        const patientToUpdate = await entityManager.findOneOrFail(Patient, { DNI });
        entityManager.assign(patientToUpdate, req.body.sanitizedInput);
        await entityManager.flush();
        res.status(200).json({ message: 'patient updated', data: patientToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const DNI = req.params.id;
        const patient = await entityManager.findOne(Patient, { DNI });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        await entityManager.removeAndFlush(patient);
        res.status(200).json({ message: 'Patient removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizePatientInput, findall, findOne, add, update, remove };
//# sourceMappingURL=patient.controler.js.map