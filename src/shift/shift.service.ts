import { EntityManager } from '@mikro-orm/mysql';
import { Shift } from './shift.entity.js';
import { Patient } from '../patient/patient.entity.js';
import { Professional } from '../professional/professional.entity.js';

class ShiftService {
  private readonly entityManager: EntityManager;
  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async findAllShifts() {
    return await this.entityManager.find(Shift, {});
  }

  async findOneShift(id: number) {
    try {
      return await this.entityManager.findOneOrFail(Shift, id);
    } catch (error) {
      return null;
    }
  }

  async updateShift(idShift: number, dniPatient: string) {
    try {
      const shiftToUpdate = await this.entityManager.findOneOrFail(
        Shift,
        idShift
      );
      if (!shiftToUpdate) return null;
      const DNI = dniPatient;
      const patient = await this.entityManager.findOneOrFail(Patient, { DNI });
      if (!patient) throw new Error('Patient not found');
      shiftToUpdate.dniPatient = patient;
      shiftToUpdate.status = 'ocupado';
      this.entityManager.assign(shiftToUpdate, shiftToUpdate);
      await this.entityManager.flush();
      return shiftToUpdate;
    } catch (error: any) {
      return null;
    }
  }

  async removeShift(id: number) {
    const shiftToRemove = await this.entityManager.findOne(Shift, id);
    if (!shiftToRemove) {
      throw new Error('Health insurance not found');
    }
    await this.entityManager.removeAndFlush(shiftToRemove);
  }

  async removeShiftByProf(licenseNumber: string) {
    try {
      const professional = await this.entityManager.findOne(Professional, {
        licenseNumber,
      });
      const shift = await this.entityManager.find(Shift, {
        licenseProfessional: professional,
        dniPatient: null,
      });
      if (!shift) {
        return null;
      }
      await this.entityManager.removeAndFlush(shift);
      return shift;
    } catch (error: any) {
      return null;
    }
  }
}

export default ShiftService;
