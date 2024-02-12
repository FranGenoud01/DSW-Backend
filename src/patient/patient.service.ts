import { Patient } from './patient.entity.js';
import * as bcrypt from 'bcrypt';
import { EntityManager } from '@mikro-orm/mysql';

class PatientService {
  private readonly entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async findAllPatients() {
    return await this.entityManager.find(
      Patient,
      {},
      { populate: ['healthInsurance'] }
    );
  }

  async findOneByDNI(DNI: string) {
    try {
      return await this.entityManager.findOneOrFail(
        Patient,
        { DNI },
        { populate: ['healthInsurance'] }
      );
    } catch (error) {
      return null;
    }
  }

  async updatePatient(DNI: string, patientData: Patient) {
    const patientToUpdate = await this.entityManager.findOneOrFail(Patient, {
      DNI,
    });
    this.entityManager.assign(patientToUpdate, patientData);
    await this.entityManager.flush();
    return patientToUpdate;
  }

  async removePatient(DNI: string) {
    const patient = await this.entityManager.findOne(Patient, { DNI });
    if (!patient) {
      throw new Error('Patient not found');
    }
    await this.entityManager.removeAndFlush(patient);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async registerPatient(patientData: Patient): Promise<Patient> {
    if (!patientData.password) {
      throw new Error('No se proporcionó una contraseña');
    }
    const dni = patientData.DNI;
    const hashedPassword = await this.hashPassword(patientData.password);
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
