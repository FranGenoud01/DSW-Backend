import { Patient } from './patient.entity.js';
import * as bcrypt from 'bcrypt';
class PatientService {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async findAllPatients() {
        return await this.entityManager.find(Patient, {}, { populate: ['healthInsurance'] });
    }
    async findOneByDNI(DNI) {
        try {
            return await this.entityManager.findOneOrFail(Patient, { DNI }, { populate: ['healthInsurance'] });
        }
        catch (error) {
            return null;
        }
    }
    async updatePatient(DNI, patientData) {
        const patientToUpdate = await this.entityManager.findOneOrFail(Patient, {
            DNI,
        });
        const hashedPassword = await this.hashPassword(patientData.password);
        const patient = {
            ...patientData,
            password: hashedPassword,
        };
        this.entityManager.assign(patientToUpdate, patient);
        await this.entityManager.flush();
        return patientToUpdate;
    }
    async removePatient(DNI) {
        const patient = await this.entityManager.findOne(Patient, { DNI });
        if (!patient) {
            throw new Error('Patient not found');
        }
        await this.entityManager.removeAndFlush(patient);
    }
    async hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    async registerPatient(patientData) {
        if (!patientData.password) {
            throw new Error('No se proporcionó una contraseña');
        }
        const dni = patientData.DNI;
        const hashedPassword = await this.hashPassword(patientData.password);
        const patient = await this.findOneByDNI(dni);
        const rol = 'user';
        if (patient) {
            throw new Error('Ya existe un paciente con este DNI');
        }
        const updatedPatientData = {
            ...patientData,
            password: hashedPassword,
            DNI: dni,
        };
        const newPatient = this.entityManager.create(Patient, updatedPatientData);
        await this.entityManager.persistAndFlush(newPatient);
        return newPatient;
    }
}
export default PatientService;
//# sourceMappingURL=patient.service.js.map