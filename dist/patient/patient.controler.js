import { orm } from '../shared/orm.js';
import PatientService from './patient.service.js';
const entityManager = orm.em;
const patientService = new PatientService(entityManager);
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
        password: req.body.password,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] == undefined)
            delete req.body.sanitizedInput[key];
    });
    next();
}
async function findall(req, res) {
    try {
        const patients = await patientService.findAllPatients();
        res.status(200).json({ message: 'Found all patients', data: patients });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const DNI = req.params.id;
        const patient = await patientService.findOneByDNI(DNI);
        res.status(200).json({ message: 'Found patient', data: patient });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const patient = await patientService.registerPatient(req.body.sanitizedInput);
        res.status(201).json({ message: 'Patient created', data: patient });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const DNI = req.params.id;
        const patientToUpdate = await patientService.updatePatient(DNI, req.body);
        res.status(200).json({ message: 'Patient updated', data: patientToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const DNI = req.params.id;
        await patientService.removePatient(DNI);
        res.status(200).json({ message: 'Patient removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizePatientInput, findall, findOne, add, update, remove };
//# sourceMappingURL=patient.controler.js.map